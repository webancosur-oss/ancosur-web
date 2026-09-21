import type { ProyectoWeb, ProyectosResponse } from "@/src/types/proyectoWeb";

const DEFAULT_BACKEND_URL = "https://ancosur-api-production.up.railway.app";
export const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/+$/, "");

export type ProyectoFilters = {
  page?: number;
  limit?: number;
  buscar?: string;
  tipo?: string;
  etapa?: string;
  estado?: string;
  ciudad?: string;
  activo?: boolean;
  codigo?: string;
  slug?: string;
};

function buildQuery(filters: ProyectoFilters = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      params.set(key, String(value));
    }
  }
  return params.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text.trim()) throw new Error("El backend devolvió una respuesta vacía.");
  try { return JSON.parse(text) as T; }
  catch { throw new Error("La API de proyectos no devolvió JSON válido."); }
}

export class ProyectosWebAPI {
  static async listar(filters: ProyectoFilters = {}, options?: RequestInit): Promise<ProyectosResponse> {
    const query = buildQuery(filters);
    const url = `${BACKEND_URL}/api/web/proyectos${query ? `?${query}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", ...(options?.headers || {}) },
      ...options,
      cache: options?.cache ?? "no-store",
    });
    const data = await parseResponse<ProyectosResponse>(response);
    if (!response.ok || data.success === false) {
      throw new Error(data.message || `Error HTTP ${response.status} al consultar proyectos.`);
    }
    return data;
  }

  static listarActivos(filters: Omit<ProyectoFilters, "activo"> = {}) {
    return this.listar({ ...filters, activo: true });
  }

  static listarDepartamentos(filters: Omit<ProyectoFilters, "tipo"> = {}) {
    return this.listar({ ...filters, tipo: "Departamento" });
  }

  static listarLotes(filters: Omit<ProyectoFilters, "tipo"> = {}) {
    return this.listar({ ...filters, tipo: "Lote" });
  }

  static listarResorts(filters: Omit<ProyectoFilters, "tipo"> = {}) {
    return this.listar({ ...filters, tipo: "Resort" });
  }

  static listarEntregados(limit = 100) {
    return this.listar({ etapa: "FINALIZADOS", limit });
  }
}

export function getProjectAssetUrl(value?: string | null): string {
  if (!value?.trim()) return "";
  const url = value.trim();
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  return `${BACKEND_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function getProjectHref(project: ProyectoWeb): string {
  if (!project.ruta?.trim()) return "";
  return project.ruta.startsWith("/") ? project.ruta : `/${project.ruta}`;
}
