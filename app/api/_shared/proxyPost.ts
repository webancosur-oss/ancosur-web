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
  code?: string;
  message?: string;
  error?: string;
  data?: unknown;
  response?: unknown;
  errors?: unknown;
  [key: string]: unknown;
};

const SOURCE_ID = 4 as const;
const REQUEST_TIMEOUT = 20_000;

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_CAMPAIGN_LENGTH = 30;
const MAX_AD_LENGTH = 50;
const MAX_CLIENT_MESSAGE_LENGTH = 500;
const MAX_COMMENT_LENGTH = 250;

const isObject = (
  value: unknown
): value is UnknownPayload => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const getString = (
  value: unknown
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

const normalizeSingleLine = (
  value: unknown,
  maxLength: number
): string => {
  return getString(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
};

const normalizePhone = (
  value: unknown
): string => {
  return getString(value)
    .replace(/\D/g, "")
    .slice(0, 9);
};

const normalizeDni = (
  value: unknown
): string => {
  return getString(value)
    .replace(/\D/g, "")
    .slice(0, 8);
};

/**
 * msj_client:
 *
 * - Si recibe un texto, conserva ese texto.
 * - Si recibe un objeto, convierte solamente ese objeto a JSON.
 * - Si no recibe nada, devuelve una cadena vacía.
 *
 * No agrega automáticamente interés, precio, área,
 * ubicación, componente ni otros datos.
 */
const normalizeClientMessage = (
  value: unknown
): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (isObject(value)) {
    return JSON.stringify(value);
  }

  return "";
};

const normalizePayload = (
  body: UnknownPayload
): LeadPayload => {
  const telefono = normalizePhone(
    body.telefono ??
      body.phone ??
      body.celular
  );

  const nombre = normalizeSingleLine(
    firstString(
      body.nombre,
      body.fullName,
      body.full_name,
      body.nombres_completos
    ),
    MAX_NAME_LENGTH
  );

  const email = normalizeSingleLine(
    firstString(
      body.email,
      body.correo
    ).toLowerCase(),
    MAX_EMAIL_LENGTH
  );

  const dni = normalizeDni(
    body.dni ??
      body.documento
  );

  /*
   * La campaña se limita a 30 caracteres para
   * no enviar textos excesivamente largos al CRM.
   */
  const campaña = normalizeSingleLine(
    firstString(
      body["campaña"],
      body.campania,
      body.campaign,
      body.campania_nombre,
      body.campaignName,
      "WEB ANCOSUR"
    ),
    MAX_CAMPAIGN_LENGTH
  );

  const anuncio = normalizeSingleLine(
    firstString(
      body.anuncio,
      body.source,
      body.fuente_prospeccion,
      "Web"
    ),
    MAX_AD_LENGTH
  );

  /*
   * Solamente toma msj_client.
   *
   * Como compatibilidad, también acepta message o mensaje
   * cuando msj_client no fue enviado.
   */
  const msjClient = normalizeClientMessage(
    body.msj_client ??
      body.message ??
      body.mensaje
  );

  /*
   * El comentario es opcional.
   * No se genera ningún comentario automático.
   */
  const comentario = getString(
    body.comentario
  );

  return {
    fuente_id: SOURCE_ID,
    telefono,
    nombre,
    email,
    dni,
    campaña,
    anuncio,
    msj_client: msjClient,
    comentario,
  };
};

const validatePayload = (
  payload: LeadPayload
): string[] => {
  const errors: string[] = [];

  /*
   * Teléfono obligatorio.
   */
  if (!payload.telefono) {
    errors.push(
      "El número de celular es obligatorio."
    );
  } else if (
    !/^9\d{8}$/.test(payload.telefono)
  ) {
    errors.push(
      "El celular debe tener 9 dígitos y comenzar con 9."
    );
  }

  /*
   * Nombre obligatorio.
   */
  if (!payload.nombre) {
    errors.push(
      "El nombre completo es obligatorio."
    );
  } else if (
    payload.nombre.length < 3
  ) {
    errors.push(
      "El nombre debe contener al menos 3 caracteres."
    );
  } else if (
    !/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’\-]+$/.test(
      payload.nombre
    )
  ) {
    errors.push(
      "El nombre solamente puede contener letras, espacios, puntos, apóstrofes y guiones."
    );
  }

  /*
   * Correo opcional.
   * Solo se valida cuando fue enviado.
   */
  if (
    payload.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
      payload.email
    )
  ) {
    errors.push(
      "El correo electrónico no es válido."
    );
  }

  /*
   * DNI opcional.
   * Solo se valida cuando fue enviado.
   */
  if (
    payload.dni &&
    !/^\d{8}$/.test(payload.dni)
  ) {
    errors.push(
      "El DNI debe contener exactamente 8 dígitos."
    );
  }

  if (!payload.campaña) {
    errors.push(
      "La campaña es obligatoria."
    );
  }

  if (
    payload.msj_client.length >
    MAX_CLIENT_MESSAGE_LENGTH
  ) {
    errors.push(
      `El mensaje del cliente no debe superar los ${MAX_CLIENT_MESSAGE_LENGTH} caracteres.`
    );
  }

  if (
    payload.comentario.length >
    MAX_COMMENT_LENGTH
  ) {
    errors.push(
      `El comentario no debe superar los ${MAX_COMMENT_LENGTH} caracteres.`
    );
  }

  return errors;
};

const parseResponse = (
  responseText: string,
  responseOk: boolean
): ApiResponse => {
  if (!responseText.trim()) {
    return {
      success: responseOk,
      message: responseOk
        ? "Solicitud procesada correctamente."
        : "La API no devolvió contenido.",
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(responseText);

    if (isObject(parsed)) {
      return parsed as ApiResponse;
    }

    return {
      success: responseOk,
      data: parsed,
    };
  } catch {
    return {
      success: responseOk,
      message: responseText,
    };
  }
};

/**
 * Detecta errores aunque la API responda:
 *
 * {
 *   "success": true,
 *   "data": {
 *     "success": false
 *   }
 * }
 */
const hasApiFailure = (
  value: unknown
): boolean => {
  if (!isObject(value)) {
    return false;
  }

  if (value.success === false) {
    return true;
  }

  return (
    hasApiFailure(value.data) ||
    hasApiFailure(value.response)
  );
};

const extractApiMessage = (
  value: unknown
): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!isObject(value)) {
    return "";
  }

  if (
    typeof value.error === "string" &&
    value.error.trim()
  ) {
    return value.error.trim();
  }

  const nestedDataMessage =
    extractApiMessage(value.data);

  if (nestedDataMessage) {
    return nestedDataMessage;
  }

  const nestedResponseMessage =
    extractApiMessage(value.response);

  if (nestedResponseMessage) {
    return nestedResponseMessage;
  }

  if (
    typeof value.message === "string" &&
    value.message.trim()
  ) {
    return value.message.trim();
  }

  return "";
};

const extractApiCode = (
  value: unknown
): string => {
  if (!isObject(value)) {
    return "";
  }

  if (
    typeof value.code === "string" &&
    value.code.trim()
  ) {
    return value.code.trim();
  }

  return (
    extractApiCode(value.data) ||
    extractApiCode(value.response)
  );
};

const isCampaignLengthError = (
  message: string
): boolean => {
  const normalized =
    message.toLowerCase();

  return (
    normalized.includes(
      "sqlstate[22001]"
    ) ||
    normalized.includes(
      "data too long for column 'campaña'"
    ) ||
    normalized.includes(
      'data too long for column "campaña"'
    ) ||
    (
      normalized.includes("1406") &&
      normalized.includes("campaña")
    )
  );
};

const getErrorStatus = (
  externalStatus: number,
  campaignLengthError: boolean
): number => {
  if (campaignLengthError) {
    return 422;
  }

  /*
   * La API externa puede responder HTTP 200
   * aunque internamente tenga success: false.
   */
  if (
    externalStatus >= 200 &&
    externalStatus < 300
  ) {
    return 502;
  }

  if (
    externalStatus >= 400 &&
    externalStatus <= 599
  ) {
    return externalStatus;
  }

  return 502;
};

export async function proxyPost(
  request: Request
) {
  const controller =
    new AbortController();

  const timeoutId =
    setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

  try {
    const apiUrl =
      process.env.LEADS_API_URL?.trim();

    if (!apiUrl) {
      return NextResponse.json(
        {
          success: false,
          code: "MISSING_API_URL",
          message:
            "No existe LEADS_API_URL en las variables de entorno.",
        },
        {
          status: 500,
        }
      );
    }

    const contentType =
      request.headers.get(
        "content-type"
      ) ?? "";

    if (
      !contentType.includes(
        "application/json"
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_CONTENT_TYPE",
          message:
            "La solicitud debe enviarse como application/json.",
        },
        {
          status: 415,
        }
      );
    }

    let rawBody: unknown;

    try {
      rawBody =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_JSON",
          message:
            "El cuerpo de la solicitud no contiene un JSON válido.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isObject(rawBody)) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_PAYLOAD",
          message:
            "El contenido enviado no es válido.",
        },
        {
          status: 400,
        }
      );
    }

    const payload =
      normalizePayload(rawBody);

    const validationErrors =
      validatePayload(payload);

    if (
      validationErrors.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message:
            validationErrors[0],
          errors:
            validationErrors,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Muestra exactamente lo que sale
     * desde Next.js hacia el CRM.
     */
    console.log(
      "[API Leads] Payload enviado al CRM:",
      {
        telefono:
          payload.telefono,

        nombre:
          payload.nombre,

        email:
          payload.email || "",

        dni:
          payload.dni || "",

        campaña:
          payload.campaña,

        anuncio:
          payload.anuncio,

        msj_client:
          payload.msj_client || "",

        comentario:
          payload.comentario || "",

        fuente_id:
          payload.fuente_id,
      }
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

        body:
          JSON.stringify(payload),

        cache: "no-store",

        signal:
          controller.signal,
      });

    const responseText =
      await externalResponse.text();

    const externalData =
      parseResponse(
        responseText,
        externalResponse.ok
      );

    const logicalFailure =
      hasApiFailure(externalData);

    const requestFailed =
      !externalResponse.ok ||
      logicalFailure;

    if (requestFailed) {
      const externalMessage =
        extractApiMessage(
          externalData
        );

      const externalCode =
        extractApiCode(
          externalData
        );

      const campaignLengthError =
        isCampaignLengthError(
          externalMessage
        );

      const responseStatus =
        getErrorStatus(
          externalResponse.status,
          campaignLengthError
        );

      console.error(
        "[API Leads] La API externa rechazó el lead:",
        {
          status:
            externalResponse.status,

          logicalFailure,

          code:
            externalCode,

          message:
            externalMessage,

          data:
            externalData,
        }
      );

      return NextResponse.json(
        {
          success: false,

          code:
            campaignLengthError
              ? "CAMPAIGN_HISTORY_TOO_LONG"
              : externalCode ||
                "EXTERNAL_API_ERROR",

          message:
            campaignLengthError
              ? "El historial de campañas de este contacto superó el límite permitido por el CRM."
              : externalMessage ||
                "La API externa rechazó el registro del lead.",

          status:
            externalResponse.status,

          data:
            externalData,
        },
        {
          status:
            responseStatus,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          extractApiMessage(
            externalData
          ) ||
          "Lead registrado correctamente.",

        data:
          externalData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      error.name === "AbortError";

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido";

    console.error(
      "[API Leads] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        code:
          isTimeout
            ? "REQUEST_TIMEOUT"
            : "INTERNAL_PROXY_ERROR",

        message:
          isTimeout
            ? "La API externa tardó demasiado en responder."
            : "No se pudo registrar el lead.",

        error:
          errorMessage,
      },
      {
        status:
          isTimeout
            ? 504
            : 500,
      }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}