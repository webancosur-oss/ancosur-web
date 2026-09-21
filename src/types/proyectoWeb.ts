// src/types/proyectoWeb.ts

export type ProyectoTipo =
  | "Departamento"
  | "Lote"
  | "Resort"
  | "Casa";

export type ProyectoEstado =
  | "disponible"
  | "sin_unidades"
  | "vendido";

export type ProyectoEtapa =
  | "PRE VENTA"
  | "LANZAMIENTO"
  | "EN CONSTRUCCIÓN"
  | "ENTREGA INMEDIATA"
  | "ENTREGADO"
  | "TODOS VENDIDOS"
  | string;

export type ProyectoWeb = {
  id: string;

  codigo: string;
  titulo: string;
  slug: string;

  tipo: ProyectoTipo;

  ciudad: string;
  direccion: string;
  etapa: ProyectoEtapa;

  ruta?: string | null;
  whatsapp?: string | null;

  imagen_nombre?: string | null;
  imagen_tipo?: string | null;
  imagen_tamano?: number | null;
  imagen_url?: string | null;

  logo_nombre?: string | null;
  logo_tipo?: string | null;
  logo_tamano?: number | null;
  logo_url?: string | null;

  dormitorios?: string | null;

  metraje_desde?: number | null;
  metraje_hasta?: number | null;

  estado: ProyectoEstado;

  precio_desde?: number | null;

  activo: boolean;
  orden: number;

  creado_en?: string;
  actualizado_en?: string;

  created_at?: string;
  updated_at?: string;
};

export type ProyectosResponse = {
  success: boolean;
  data: ProyectoWeb[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };

  message?: string;
};

export type OpcionesProyectos = {
  tipos: ProyectoTipo[];
  etapas: ProyectoEtapa[];
  estados: ProyectoEstado[];
};