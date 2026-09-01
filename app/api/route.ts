import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

function backendUrl(path: string) {
  return `${BACKEND_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function proxyJson(
  request: NextRequest,
  method: string,
  path: string,
) {
  try {
    const body =
      method === "GET" || method === "DELETE"
        ? undefined
        : await request.text();

    const response = await fetch(backendUrl(path), {
      method,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(body
          ? {
              "Content-Type":
                request.headers.get("content-type") ||
                "application/json",
            }
          : {}),
      },
      body,
    });

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
    console.error("Blog API proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo conectar con la API del blog.",
      },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.search;
  return proxyJson(
    request,
    "GET",
    `/api/blog${query}`,
  );
}

export async function POST(request: NextRequest) {
  return proxyJson(
    request,
    "POST",
    "/api/blog",
  );
}
