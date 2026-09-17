"use client";

import { useState } from "react";

import DatosPersonales from "./DatosPersonales";
import DatosInmueble from "./DatosInmueble";
import DetalleReclamo from "./DetalleReclamo";
import DatosMenor from "./DatosMenor";
import Adjuntos from "./Adjuntos";

import {
  crearReclamo,
  ReclamoPayload,
} from "../lib/reclamosApi";

import styles from "./ReclamoForm.module.css";

const initialForm: ReclamoPayload = {
  establecimiento: "ANCOSUR",
  tipo: "reclamo",

  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",

  tipo_documento: "",
  numero_documento: "",

  departamento: "Junín",
  provincia: "Huancayo",
  distrito: "",
  domicilio: "",

  es_menor: false,

  tutor_nombres: "",
  tutor_apellidos: "",
  tutor_tipo_documento: "",
  tutor_numero_documento: "",

  tipo_bien: "",
  proyecto: "",
  tipo_proyecto: "",
  estado_proyecto: "",
  ciudad_proyecto: "",
  direccion_proyecto: "",

  edificio_torre_bloque: "",
  unidad_inmobiliaria: "",
  numero_operacion: "",

  descripcion_producto_servicio: "",
  monto_reclamado: 0,

  detalle: "",
  pedido: "",

  autoriza_notificacion_email: true,
  correo_notificacion: "",

  conformidad: false,

  canal: "web",
  fecha_frontend: new Date().toISOString(),
};

export default function ReclamoForm() {
  const [form, setForm] =
    useState<ReclamoPayload>(initialForm);

  const [archivos, setArchivos] = useState<File[]>([]);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setResultado(null);

    if (!form.nombres.trim()) {
      setError("Ingresa tus nombres.");
      return;
    }

    if (!form.apellidos.trim()) {
      setError("Ingresa tus apellidos.");
      return;
    }

    if (!form.tipo_documento) {
      setError("Selecciona tu tipo de documento.");
      return;
    }

    if (!form.numero_documento.trim()) {
      setError("Ingresa tu número de documento.");
      return;
    }

    if (!form.proyecto.trim()) {
      setError("Ingresa el proyecto relacionado.");
      return;
    }

    if (!form.detalle.trim()) {
      setError("Describe el detalle del reclamo.");
      return;
    }

    if (!form.pedido.trim()) {
      setError("Indica tu pedido concreto.");
      return;
    }

    if (!form.conformidad) {
      setError(
        "Debes confirmar la conformidad de la información proporcionada."
      );
      return;
    }

    try {
      setEnviando(true);

      const payload = {
        ...form,
        fecha_frontend: new Date().toISOString(),
      };

      const response = await crearReclamo(
        payload,
        archivos
      );

      setResultado(response);

      setForm(initialForm);
      setArchivos([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo registrar el reclamo."
      );
    } finally {
      setEnviando(false);
    }
  };

  if (resultado) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>

        <h2>Reclamo registrado correctamente</h2>

        <p>
          Tu solicitud ha sido registrada en nuestro Libro de
          Reclamaciones.
        </p>

        {resultado.codigo_registro && (
          <div className={styles.code}>
            <span>Código de registro</span>
            <strong>
              {resultado.codigo_registro}
            </strong>
          </div>
        )}

        {resultado.constancia_url && (
          <a
            href={resultado.constancia_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pdfButton}
          >
            Ver constancia
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.card}>
        <DatosPersonales
          form={form}
          setForm={setForm}
        />
      </div>

      <div className={styles.card}>
        <DatosInmueble
          form={form}
          setForm={setForm}
        />
      </div>

      <div className={styles.card}>
        <DetalleReclamo
          form={form}
          setForm={setForm}
        />
      </div>

      <div className={styles.card}>
        <DatosMenor
          form={form}
          setForm={setForm}
        />
      </div>

      <div className={styles.card}>
        <Adjuntos
          archivos={archivos}
          setArchivos={setArchivos}
        />
      </div>

      <div className={styles.card}>
        <h2>6. Confirmación</h2>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.autoriza_notificacion_email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                autoriza_notificacion_email:
                  e.target.checked,
              }))
            }
          />

          Autorizo que las comunicaciones relacionadas con
          este registro sean enviadas por correo electrónico.
        </label>

        {form.autoriza_notificacion_email && (
          <label>
            Correo para notificaciones
            <input
              type="email"
              value={form.correo_notificacion}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  correo_notificacion:
                    e.target.value,
                }))
              }
              placeholder="correo@ejemplo.com"
            />
          </label>
        )}

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.conformidad}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                conformidad: e.target.checked,
              }))
            }
          />

          Declaro que la información proporcionada es
          verdadera y correcta. *
        </label>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className={styles.submit}
      >
        {enviando
          ? "Registrando..."
          : "Registrar reclamo"}
      </button>
    </form>
  );
}