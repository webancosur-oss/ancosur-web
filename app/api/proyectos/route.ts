import { NextRequest, NextResponse } from "next/server";

/* =========================================================
   CONFIGURACIÓN DEL BACKEND GO
========================================================= */

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================================
   GET /api/proyectos
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    /*
    ---------------------------------------------------------
    OBTENER QUERY PARAMS
    ---------------------------------------------------------
    */

    const searchParams =
      request.nextUrl.searchParams;

    /*
    ---------------------------------------------------------
    CONSTRUIR URL DEL BACKEND GO
    ---------------------------------------------------------
    */

    const backendUrl =
      new URL(
        `${BACKEND_URL}/api/web/proyectos`
      );

    /*
    ---------------------------------------------------------
    COPIAR TODOS LOS PARÁMETROS
    ---------------------------------------------------------
    */

    searchParams.forEach(
      (value, key) => {
        backendUrl.searchParams.set(
          key,
          value
        );
      }
    );

    /*
    ---------------------------------------------------------
    LLAMAR AL BACKEND GO
    ---------------------------------------------------------
    */

    const response =
      await fetch(
        backendUrl.toString(),
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",
          },

          cache: "no-store",
        }
      );

    /*
    ---------------------------------------------------------
    OBTENER RESPUESTA COMO TEXTO
    ---------------------------------------------------------

    No hacemos response.json() directamente.
    Primero obtenemos texto para evitar que un error HTML
    del backend rompa el JSON del frontend.
    ---------------------------------------------------------
    */

    const responseText =
      await response.text();

    /*
    ---------------------------------------------------------
    INTENTAR CONVERTIR A JSON
    ---------------------------------------------------------
    */

    let data: unknown;

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
      console.error(
        "Backend Go devolvió una respuesta que no es JSON:",
        responseText
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "El servidor de proyectos devolvió una respuesta inválida.",
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 502,
        }
      );
    }

    /*
    ---------------------------------------------------------
    DEVOLVER RESPUESTA
    ---------------------------------------------------------
    */

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (error) {
    console.error(
      "Error en /api/proyectos:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo conectar con el servidor de proyectos.",
      },
      {
        status: 500,
      }
    );
  }
}