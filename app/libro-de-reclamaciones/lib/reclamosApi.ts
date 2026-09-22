export interface ReclamoPayload {
  establecimiento: string;
  tipo: "reclamo" | "queja";

  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;

  tipo_documento: string;
  numero_documento: string;

  departamento: string;
  provincia: string;
  distrito: string;
  domicilio: string;

  es_menor: boolean;

  tutor_nombres: string;
  tutor_apellidos: string;
  tutor_tipo_documento: string;
  tutor_numero_documento: string;

  tipo_bien: string;
  proyecto: string;
  tipo_proyecto: string;
  estado_proyecto: string;
  ciudad_proyecto: string;
  direccion_proyecto: string;

  edificio_torre_bloque: string;
  unidad_inmobiliaria: string;
  numero_operacion: string;

  descripcion_producto_servicio: string;
  monto_reclamado: number;

  detalle: string;
  pedido: string;

  autoriza_notificacion_email: boolean;
  correo_notificacion: string;

  conformidad: boolean;

  canal: string;
  fecha_frontend: string;
}

export async function crearReclamo(
  data: ReclamoPayload,
  archivos: File[] = []
) {
  const url = "/api/reclamos";

  let response: Response;

  if (archivos.length === 0) {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } else {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    archivos.forEach((archivo) => {
      formData.append("adjuntos", archivo);
    });

    response = await fetch(url, {
      method: "POST",
      body: formData,
    });
  }

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        result.error ||
        "No se pudo registrar el reclamo."
    );
  }

  return result;
}