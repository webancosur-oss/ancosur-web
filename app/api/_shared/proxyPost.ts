import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type ApiPayload = Record<string, unknown>;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ProxyOptions = {
  requireAuth?: boolean;
};

const SESSION_COOKIE_NAME = "ancosur_session";

const getApiBaseUrl = (): string => {
  const apiUrl = process.env.API_URL?.trim();

  if (!apiUrl) {
    throw new Error(
      "No existe API_URL en las variables de entorno del frontend.",
    );
  }

  return apiUrl.replace(/\/+$/, "");
};

const getToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? "";
};

const getRequestPayload = async (
  request: Request,
): Promise<ApiPayload> => {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      throw new Error("El contenido enviado no es válido.");
    }

    return body as ApiPayload;
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    const payload: ApiPayload = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        payload[key] = value;
      }
    });

    return payload;
  }

  return {};
};

const parseApiResponse = (
  responseText: string,
): Record<string, unknown> => {
  if (!responseText) {
    return {
      success: true,
      message: "Solicitud procesada correctamente.",
      data: null,
    };
  }

  try {
    return JSON.parse(responseText) as Record<string, unknown>;
  } catch {
    return {
      success: false,
      message: responseText,
      data: null,
    };
  }
};

export async function proxyRequest(
  request: Request | null,
  endpoint: string,
  method: HttpMethod,
  options: ProxyOptions = {},
) {
  let targetUrl = "";

  try {
    const apiBaseUrl = getApiBaseUrl();
    const token = await getToken();

    if (options.requireAuth && !token) {
      return NextResponse.json(
        {
          success: false,
          response: "auth.token_required",
          message: "Token requerido.",
          data: null,
        },
        {
          status: 401,
        },
      );
    }

    targetUrl = `${apiBaseUrl}${endpoint}`;

    const headers: HeadersInit = {
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let body: string | undefined;

    if (
      request &&
      method !== "GET" &&
      method !== "DELETE"
    ) {
      const payload = await getRequestPayload(request);

      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }

    console.log(`[Next Proxy] ${method} ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseText = await response.text();
    const responseBody = parseApiResponse(responseText);

    if (!response.ok) {
      console.error("[Next Proxy] Error API:", {
        endpoint: targetUrl,
        status: response.status,
        response: responseBody,
      });
    }

    return NextResponse.json(responseBody, {
      status: response.status,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    console.error("[Next Proxy] No se pudo conectar:", {
      targetUrl,
      error: errorMessage,
      apiUrlConfigured: Boolean(process.env.API_URL),
    });

    return NextResponse.json(
      {
        success: false,
        response: "proxy.connection_error",
        message: "No se pudo conectar con la API de ANCOSUR.",
        data: {
          targetUrl,
          error: errorMessage,
          apiUrlConfigured: Boolean(process.env.API_URL),
        },
      },
      {
        status: 502,
      },
    );
  }
}

export async function proxyGet(
  request: Request,
  endpoint: string,
  options: ProxyOptions = {},
) {
  const { search } = new URL(request.url);

  return proxyRequest(
    null,
    `${endpoint}${search}`,
    "GET",
    options,
  );
}

export async function proxyPost(
  request: Request,
  endpoint: string,
  options: ProxyOptions = {},
) {
  return proxyRequest(request, endpoint, "POST", options);
}

export async function proxyPatch(
  request: Request,
  endpoint: string,
  options: ProxyOptions = {},
) {
  return proxyRequest(request, endpoint, "PATCH", options);
}

export async function proxyPut(
  request: Request,
  endpoint: string,
  options: ProxyOptions = {},
) {
  return proxyRequest(request, endpoint, "PUT", options);
}

export async function proxyDelete(
  endpoint: string,
  options: ProxyOptions = {},
) {
  return proxyRequest(null, endpoint, "DELETE", options);
}