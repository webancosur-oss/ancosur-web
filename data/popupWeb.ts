import { BACKEND_URL } from "./proyectosWeb";

/* =========================================================
   POP-UP DE LA WEB
   Lo administra marketing en el CRM (Página web → Pop-up):
   afiche, textos, qué datos pide el formulario, en qué
   páginas sale y hasta cuándo. Aquí solo se lee.
========================================================= */

export type TipoCampoPopup =
  | "texto"
  | "telefono"
  | "email"
  | "dni"
  | "opciones"
  | "proyecto"
  | "parrafo";

export type CampoPopup = {
  clave: string;
  etiqueta: string;
  tipo: TipoCampoPopup;
  marcador: string;
  obligatorio: boolean;
  visible: boolean;
  opciones: string[];
};

export type PopupWeb = {
  id: number;
  nombre: string;
  antetitulo: string | null;
  titulo: string;
  resaltado: string | null;
  resumen: string | null;
  texto_boton: string;
  campana: string;
  mensaje_exito: string | null;
  vigencia_texto: string | null;
  paginas: string[];
  retraso_seg: number;
  campos: CampoPopup[];
  imagen_url: string | null;
  imagen_ancho: number | null;
  imagen_alto: number | null;
  actualizado_en: string;
};

/** El pop-up vigente para esa ruta, o null si no hay ninguno (o el CRM no responde). */
export async function obtenerPopupWeb(
  ruta: string,
  signal?: AbortSignal,
): Promise<PopupWeb | null> {
  const url = `${BACKEND_URL}/api/web/popup?ruta=${encodeURIComponent(ruta || "/")}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) return null;
  const json = (await response.json().catch(() => null)) as
    | { success?: boolean; data?: PopupWeb | null }
    | null;
  return json?.success ? (json.data ?? null) : null;
}

/** URL absoluta del afiche (la API la devuelve relativa a sí misma). */
export function urlAfichePopup(valor: string | null): string {
  if (!valor?.trim()) return "";
  const v = valor.trim();
  if (/^(https?:|data:|blob:)/i.test(v)) return v;
  return `${BACKEND_URL}${v.startsWith("/") ? v : `/${v}`}`;
}
