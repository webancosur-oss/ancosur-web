// data/proyectoWeb.ts

import type {
  ProyectoWeb,
  ProyectosResponse,
  OpcionesProyectos,
  ProyectoTipo,
  ProyectoEtapa,
  ProyectoEstado,
} from "@/src/types/proyectoWeb";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://ancosur-api-production.up.railway.app";

type ListarParams = {
  activo?: boolean;
  tipo?: ProyectoTipo;
  etapa?: ProyectoEtapa;
  estado?: ProyectoEstado;
  ciudad?: string;
  limit?: number;
  page?: number;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  message?: string;
};

function buildQuery(params: ListarParams = {}): string {
  const searchParams = new URLSearchParams();

  if (params.activo !== undefined) {
    searchParams.set("activo", String(params.activo));
  }

  if (params.tipo) {
    searchParams.set("tipo", params.tipo);
  }

  if (params.etapa) {
    searchParams.set("etapa", params.etapa);
  }

  if (params.estado) {
    searchParams.set("estado", params.estado);
  }

  if (params.ciudad) {
    searchParams.set("ciudad", params.ciudad);
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message =
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `Error HTTP ${response.status}`;

    throw new Error(message);
  }

  return body as T;
}

export const ProyectosWebAPI = {
  async listar(
    params: ListarParams = {}
  ): Promise<ProyectosResponse> {
    return request<ProyectosResponse>(
      `/api/web/proyectos${buildQuery(params)}`
    );
  },

  async listarActivos(
    params: Omit<ListarParams, "activo"> = {}
  ): Promise<ProyectosResponse> {
    return request<ProyectosResponse>(
      `/api/web/proyectos${buildQuery({
        ...params,
        activo: true,
      })}`
    );
  },

  async obtener(id: string): Promise<ProyectoWeb> {
    const response = await request<ApiResponse<ProyectoWeb>>(
      `/api/web/proyectos/${encodeURIComponent(id)}`
    );

    return response.data;
  },

  async opciones(): Promise<OpcionesProyectos> {
    const response = await request<ApiResponse<OpcionesProyectos>>(
      "/api/web/proyectos/opciones"
    );

    return response.data;
  },
};

export function getProjectAssetUrl(
  url?: string | null
): string | null {
  if (!url) {
    return null;
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${BACKEND_URL}${url}`;
  }

  return `${BACKEND_URL}/${url}`;
}

export function getProjectHref(
  project: ProyectoWeb
): string | null {
  if (!project.ruta) {
    return null;
  }

  const ruta = project.ruta.trim();

  if (!ruta) {
    return null;
  }

  if (ruta.startsWith("http://") || ruta.startsWith("https://")) {
    return ruta;
  }

  return ruta.startsWith("/") ? ruta : `/${ruta}`;
}