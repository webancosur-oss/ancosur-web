import {
  NextRequest,
  NextResponse,
} from "next/server";

type ApiPayload = Record<string, unknown>;

const getApiBaseUrl = (): string => {
  const apiUrl =
    process.env.API_URL?.trim();

  if (!apiUrl) {
    throw new Error(
      "No existe API_URL en las variables de entorno del frontend."
    );
  }

  return apiUrl.replace(/\/+$/, "");
};

const getRequestPayload = async (
  request: NextRequest
): Promise<ApiPayload> => {
  const contentType =
    request.headers.get("content-type") ?? "";

  if (
    contentType.includes("application/json")
  ) {
    const body = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      throw new Error(
        "El contenido enviado no es válido."
      );
    }

    return body as ApiPayload;
  }

  if (
    contentType.includes(
      "multipart/form-data"
    ) ||
    contentType.includes(
      "application/x-www-form-urlencoded"
    )
  ) {
    const formData =
      await request.formData();

    const payload: ApiPayload = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        payload[key] = value;
      }
    });

    return payload;
  }

  throw new Error(
    `Formato no soportado: ${contentType || "sin content-type"}`
  );
};

const parseApiResponse = (
  responseText: string
): Record<string, unknown> => {
  if (!responseText) {
    return {
      success: true,
      message:
        "Solicitud procesada correctamente.",
    };
  }

  try {
    return JSON.parse(
      responseText
    ) as Record<string, unknown>;
  } catch {
    return {
      message: responseText,
    };
  }
};

export async function proxyPost(
  request: NextRequest,
  endpoint: string
) {
  let targetUrl = "";

  try {
    const apiBaseUrl =
      getApiBaseUrl();

    const payload =
      await getRequestPayload(request);

    targetUrl =
      `${apiBaseUrl}${endpoint}`;

    console.log(
      `[Next Proxy] POST ${targetUrl}`
    );

    console.log(
      "[Next Proxy] Payload:",
      payload
    );

    const response = await fetch(
      targetUrl,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      }
    );

    const responseText =
      await response.text();

    const responseBody =
      parseApiResponse(responseText);

    console.log(
      `[Next Proxy] Respuesta ${response.status}:`,
      responseBody
    );

    return NextResponse.json(
      responseBody,
      {
        status: response.status,
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido";

    console.error(
      "[Next Proxy] No se pudo conectar:",
      {
        targetUrl,
        error: errorMessage,
        apiUrlConfigured:
          Boolean(process.env.API_URL),
      }
    );

    return NextResponse.json(
      {
        success: false,
        response:
          "proxy.connection_error",
        message:
          "No se pudo conectar con la API de ANCOSUR.",
        data: {
          targetUrl,
          error: errorMessage,
          apiUrlConfigured:
            Boolean(process.env.API_URL),
        },
      },
      {
        status: 502,
      }
    );
  }
}