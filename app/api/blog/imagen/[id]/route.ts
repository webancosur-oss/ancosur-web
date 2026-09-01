import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function backendUrl(path: string) {
  return `${BACKEND_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export async function GET(
  _request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    const response = await fetch(
      backendUrl(
        `/api/blog/imagen/${encodeURIComponent(id)}`,
      ),
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const data = await response.arrayBuffer();

    const headers = new Headers();

    const contentType =
      response.headers.get("content-type");

    const contentLength =
      response.headers.get("content-length");

    const cacheControl =
      response.headers.get("cache-control");

    if (contentType) {
      headers.set(
        "Content-Type",
        contentType,
      );
    }

    if (contentLength) {
      headers.set(
        "Content-Length",
        contentLength,
      );
    }

    if (cacheControl) {
      headers.set(
        "Cache-Control",
        cacheControl,
      );
    } else {
      headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable",
      );
    }

    return new NextResponse(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error(
      "Blog image GET proxy error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo obtener la imagen.",
      },
      { status: 502 },
    );
  }
}
