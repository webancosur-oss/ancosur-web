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

export async function GET(
  _request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    const response = await fetch(
      `${BACKEND_URL.replace(/\/+$/, "")}/api/blog/admin/${encodeURIComponent(id)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
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
      "Blog admin proxy error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo obtener el artículo.",
      },
      { status: 502 },
    );
  }
}
