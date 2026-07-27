import { NextResponse } from "next/server";

type UnknownPayload = Record<string, unknown>;

type LeadPayload = {
  fuente_id: 4;
  telefono: string;
  nombre: string;
  email: string;
  dni: string;
  campaña: string;
  anuncio: string;
  msj_client: string;
  comentario: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  [key: string]: unknown;
};

const getString = (
  value: unknown,
): string => {
  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value).trim();
  }

  return "";
};

const firstString = (
  ...values: unknown[]
): string => {
  for (const value of values) {
    const normalized = getString(value);

    if (normalized) {
      return normalized;
    }
  }

  return "";
};

const normalizePhone = (
  value: unknown,
): string => {
  return getString(value)
    .replace(/\D/g, "")
    .slice(0, 9);
};

const normalizeDni = (
  value: unknown,
): string => {
  return getString(value)
    .replace(/\D/g, "")
    .slice(0, 8);
};

const normalizeClientMessage = (
  body: UnknownPayload,
): string => {
  const currentValue =
    body.msj_client;

  if (
    typeof currentValue === "string" &&
    currentValue.trim()
  ) {
    /*
     * Si ya viene como JSON convertido a texto,
     * se envía sin modificarlo.
     */
    return currentValue.trim();
  }

  if (
    typeof currentValue === "object" &&
    currentValue !== null
  ) {
    return JSON.stringify(
      currentValue,
    );
  }

  return JSON.stringify({
    interes: firstString(
      body.interes,
      body.project,
      body.proyecto,
      body.proyecto_interes,
      body.categoria_interes,
    ),

    mensaje: firstString(
      body.message,
      body.mensaje,
      body.comentario,
    ),

    origenRuta: firstString(
      body.origen_ruta,
      body.origenRuta,
    ),

    origenComponente: firstString(
      body.origen_componente,
      body.origenComponente,
    ),

    tipoLead: firstString(
      body.tipo_lead,
      body.tipoLead,
      body.campaign,
    ),

    areaM2:
      body.areaM2 ??
      body.area_m2 ??
      null,

    precio:
      body.price ??
      body.precio ??
      null,

    moneda:
      body.currency ??
      body.moneda ??
      null,

    ubicacion: firstString(
      body.location,
      body.ubicacion,
      body.district,
      body.distrito,
    ),

    referencia: firstString(
      body.reference,
      body.referencia,
    ),

    partidaRegistral: firstString(
      body.registryNumber,
      body.partida_registral,
    ),
  });
};

const normalizePayload = (
  body: UnknownPayload,
): LeadPayload => {
  const campaña = firstString(
    body["campaña"],
    body.campania,
    body.campaign,
    body.campania_nombre,
    body.campaignName,
    "Formulario web ANCOSUR",
  );

  const anuncio = firstString(
    body.anuncio,
    body.origen_componente,
    body.origenComponente,
    body.source,
    body.fuente_prospeccion,
    "Página web ANCOSUR",
  );

  const comentario = firstString(
    body.comentario,
    body.message,
    body.mensaje,
    "Cliente interesado registrado desde la página web.",
  );

  return {
    fuente_id: 4,
    telefono: normalizePhone(
      body.telefono ??
        body.phone ??
        body.celular,
    ),

    nombre: firstString(
      body.nombre,
      body.fullName,
      body.full_name,
      body.nombres_completos,
    ),

    email: firstString(
      body.email,
      body.correo,
    ).toLowerCase(),

    dni: normalizeDni(
      body.dni ??
        body.documento,
    ),

    campaña,

    anuncio,

    msj_client:
      normalizeClientMessage(body),

    comentario,
  };
};

const validatePayload = (
  payload: LeadPayload,
): string[] => {
  const errors: string[] = [];

  if (
    !/^9\d{8}$/.test(
      payload.telefono,
    )
  ) {
    errors.push(
      "El celular debe tener 9 dígitos y comenzar con 9.",
    );
  }

  if (
    payload.nombre.length < 3
  ) {
    errors.push(
      "El nombre es obligatorio.",
    );
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      payload.email,
    )
  ) {
    errors.push(
      "El correo electrónico no es válido.",
    );
  }

  /*
   * El DNI se valida solamente cuando fue enviado.
   * Así los formularios que todavía no solicitan DNI
   * también pueden registrar leads.
   */
  if (
    payload.dni &&
    !/^\d{8}$/.test(payload.dni)
  ) {
    errors.push(
      "El DNI debe tener 8 dígitos.",
    );
  }

  if (!payload.campaña) {
    errors.push(
      "La campaña es obligatoria.",
    );
  }

  return errors;
};

const parseResponse = (
  responseText: string,
): ApiResponse => {
  if (!responseText.trim()) {
    return {};
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return parsed as ApiResponse;
    }

    return {
      message:
        "La API respondió correctamente.",
      data: parsed,
    };
  } catch {
    return {
      message: responseText,
    };
  }
};

export async function proxyPost(
  request: Request,
) {
  try {
    const apiUrl =
      process.env.LEADS_API_URL?.trim();

    if (!apiUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No existe LEADS_API_URL en las variables de entorno.",
        },
        {
          status: 500,
        },
      );
    }

    const contentType =
      request.headers.get(
        "content-type",
      ) ?? "";

    if (
      !contentType.includes(
        "application/json",
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "La solicitud debe enviarse como application/json.",
        },
        {
          status: 415,
        },
      );
    }

    const rawBody: unknown =
      await request.json();

    if (
      typeof rawBody !== "object" ||
      rawBody === null ||
      Array.isArray(rawBody)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El contenido enviado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      rawBody as UnknownPayload;

    const payload =
      normalizePayload(body);

    const validationErrors =
      validatePayload(payload);

    if (
      validationErrors.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            validationErrors[0],
          errors:
            validationErrors,
        },
        {
          status: 400,
        },
      );
    }

    console.log(
      "[API Leads] Enviando:",
      {
        url: apiUrl,
        campaña:
          payload.campaña,
        anuncio:
          payload.anuncio,
        telefono:
          payload.telefono,
        email:
          payload.email,
      },
    );

    const externalResponse =
      await fetch(apiUrl, {
        method: "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          payload,
        ),

        cache: "no-store",
      });

    const responseText =
      await externalResponse.text();

    const externalData =
      parseResponse(
        responseText,
      );

    if (!externalResponse.ok) {
      console.error(
        "[API Leads] La API externa rechazó el lead:",
        {
          status:
            externalResponse.status,
          data:
            externalData,
        },
      );

      return NextResponse.json(
        {
          success: false,

          message:
            externalData.message ||
            externalData.error ||
            "La API rechazó el registro del lead.",

          status:
            externalResponse.status,

          data:
            externalData,
        },
        {
          status:
            externalResponse.status,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          externalData.message ||
          "Lead registrado correctamente.",

        data:
          externalData,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido";

    console.error(
      "[API Leads] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "No se pudo registrar el lead.",

        error:
          errorMessage,
      },
      {
        status: 500,
      },
    );
  }
}