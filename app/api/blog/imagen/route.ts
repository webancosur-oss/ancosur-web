import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

function backendUrl(path: string) {
  return `${BACKEND_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export async function POST(
  request: NextRequest,
) {
  try {
    const formData =
      await request.formData();

    const response = await fetch(
      backendUrl("/api/blog/imagen"),
      {
        method: "POST",
        body: formData,
        cache: "no-store",
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
      "Blog image upload proxy error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo subir la imagen.",
      },
      { status: 502 },
    );
  }
}
