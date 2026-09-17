import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_URL =
  process.env.RECLAMOS_API_URL?.trim() ||
  process.env.API_URL?.trim() ||
  "http://localhost:5000";

const REQUEST_TIMEOUT = 30_000;

function getBackendUrl(request: Request) {
  const incomingUrl = new URL(request.url);

  const backendUrl = new URL(
    "/api/reclamos",
    BACKEND_URL
  );

  backendUrl.search = incomingUrl.search;

  return backendUrl.toString();
}

async function forwardRequest(request: Request) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const targetUrl = getBackendUrl(request);

    const contentType =
      request.headers.get("content-type") || "";

    const headers = new Headers();

    headers.set("Accept", "application/json");

    /*
     * Conservamos el Content-Type original.
     *
     * JSON:
     * application/json
     *
     * Archivos:
     * multipart/form-data; boundary=...
     */
    if (contentType) {
      headers.set(
        "Content-Type",
        contentType
      );
    }

    const body =
      request.method === "GET" ||
      request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer();

    const response = await fetch(
      targetUrl,
      {
        method: request.method,
        headers,
        body,
        cache: "no-store",
        signal: controller.signal,
      }
    );

    const responseBody =
      await response.arrayBuffer();

    const responseHeaders =
      new Headers();

    responseHeaders.set(
      "Content-Type",
      response.headers.get(
        "content-type"
      ) || "application/json"
    );

    return new NextResponse(
      responseBody,
      {
        status: response.status,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      error.name === "AbortError";

    console.error(
      "[API Reclamos] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        code: isTimeout
          ? "REQUEST_TIMEOUT"
          : "RECLAMOS_API_ERROR",

        message: isTimeout
          ? "El servicio de Libro de Reclamaciones tardó demasiado en responder."
          : "No se pudo conectar con el servidor del Libro de Reclamaciones.",

        error:
          error instanceof Error
            ? error.message
            : "Error desconocido.",
      },
      {
        status: isTimeout
          ? 504
          : 502,
      }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET(request: Request) {
  return forwardRequest(request);
}

export async function POST(request: Request) {
  return forwardRequest(request);
}

export async function PUT(request: Request) {
  return forwardRequest(request);
}