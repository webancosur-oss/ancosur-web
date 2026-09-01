import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

function backendUrl(path: string) {
  return `${BACKEND_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function proxy(
  request: NextRequest,
  method: "GET" | "PATCH" | "DELETE",
  path: string,
) {
  try {
    const body =
      method === "PATCH"
        ? await request.text()
        : undefined;

    const response = await fetch(
      backendUrl(path),
      {
        method,
        cache: "no-store",
        headers: {
          Accept: "application/json",
          ...(body
            ? {
                "Content-Type":
                  request.headers.get(
                    "content-type",
                  ) ||
                  "application/json",
              }
            : {}),
        },
        body,
      },
    );

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Blog slug proxy error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo conectar con la API del blog.",
      },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: Context,
) {
  const { slug } = await context.params;

  return proxy(
    request,
    "GET",
    `/api/blog/${encodeURIComponent(slug)}`,
  );
}

/*
 * Se mantiene para compatibilidad con clientes
 * que actualicen por slug.
 */
export async function PATCH(
  request: NextRequest,
  context: Context,
) {
  const { slug } = await context.params;

  return proxy(
    request,
    "PATCH",
    `/api/blog/${encodeURIComponent(slug)}`,
  );
}

export async function DELETE(
  request: NextRequest,
  context: Context,
) {
  const { slug } = await context.params;

  return proxy(
    request,
    "DELETE",
    `/api/blog/${encodeURIComponent(slug)}`,
  );
}
