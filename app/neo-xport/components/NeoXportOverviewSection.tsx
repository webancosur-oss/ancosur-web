"use client";

import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  useCallback,
  useState,
} from "react";
import type { FormEvent } from "react";

import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  brochureNeoXport,
  details,
  facts,
} from "../data";

import styles from "../NeoXportPage.module.css";

type ToastState = FeedbackToastData & {
  id: number;
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

export default function NeoXportOverviewSection() {
  const [isSending, setIsSending] =
    useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = (
    toastData: FeedbackToastData
  ) => {
    setToast({
      ...toastData,
      id: Date.now(),
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).replace(/\D/g, "");

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const interest = String(
      formData.get("interest") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    const consent =
      formData.get("consent") ===
      "accepted";

    const leadData = {
      fullName,
      phone,
      email,
      project: "Neo Xport",
      interest,
      message:
        "Solicitud de información enviada desde la sección de ubicación de Neo Xport.",
      campaign: "neo-xport-web",
      source: "neo-xport-page",
      consent,
      origen_ruta:
        window.location.pathname,
      origen_componente:
        "NeoXportOverviewSection",
    };

    try {
      setIsSending(true);
      setToast(null);

      const response = await fetch(
        "/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(leadData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}`
        );
      }

      form.reset();

      showToast(SUCCESS_TOAST);
    } catch (error) {
      console.error(
        "Error enviando formulario de Neo Xport:",
        error
      );

      showToast(ERROR_TOAST);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className={styles.overviewSection}
        id="informacion-neo-xport"
        aria-labelledby="neo-xport-overview-title"
      >
        <div
          className={styles.overviewInner}
        >
          <div
            className={
              styles.overviewContent
            }
          >
            <span
              className={styles.eyebrow}
            >
              Vive en movimiento
            </span>

            <h2 id="neo-xport-overview-title">
              El primer edificio con ADN
              deportivo de Huancayo
            </h2>

            <p
              className={
                styles.overviewDescription
              }
            >
              Neo Xport es un proyecto
              diseñado para personas que
              buscan un estilo de vida
              activo, dinámico y saludable.
              Vive frente al Polideportivo
              Wanka y disfruta departamentos
              modernos, áreas comunes
              especializadas y una ubicación
              conectada con los principales
              servicios de Huancayo.
            </p>

            {!!facts.length && (
              <div
                className={
                  styles.overviewFacts
                }
              >
                {facts.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    className={
                      styles.overviewFact
                    }
                  >
                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            {!!details.length && (
              <ul
                className={
                  styles.detailsList
                }
              >
                {details.map((item) => (
                  <li
                    key={`${item.label}-${item.value}`}
                  >
                    <strong>
                      {item.label}
                    </strong>

                    <span>
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div
              className={
                styles.overviewActions
              }
            >
              <a
                href={brochureNeoXport}
                download
                aria-label="Descargar brochure de Neo Xport"
              >
                <DownloadSimpleIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />

                Descargar brochure
              </a>

              <Link href="/portal-de-transparencia/neo-xport">
                Respaldo legal

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>

          <form
            className={
              styles.overviewForm
            }
            onSubmit={handleSubmit}
          >
            <div
              className={
                styles.formHeader
              }
            >
              <span>
                Solicita información
              </span>

              <strong>
                Encuentra tu departamento
                ideal
              </strong>

              <p>
                Completa tus datos y un
                asesor te brindará
                información sobre precios,
                disponibilidad, tipologías y
                opciones de financiamiento.
              </p>
            </div>

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                disabled={isSending}
                required
              />
            </label>

            <div
              className={
                styles.formTwoColumns
              }
            >
              <label>
                Celular

                <input
                  type="tel"
                  name="phone"
                  placeholder="987654321"
                  inputMode="numeric"
                  autoComplete="tel"
                  pattern="9[0-9]{8}"
                  minLength={9}
                  maxLength={9}
                  title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                  disabled={isSending}
                  required
                />
              </label>

              <label>
                Correo opcional

                <input
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  autoComplete="email"
                  maxLength={120}
                  disabled={isSending}
                />
              </label>
            </div>

            <label>
              Estoy interesado en

              <select
                name="interest"
                defaultValue=""
                disabled={isSending}
                required
              >
                <option
                  value=""
                  disabled
                >
                  Selecciona una opción
                </option>

                <option value="neo-xport-tipo-impulso">
                  Tipo Impulso
                </option>

                <option value="neo-xport-tipo-luz">
                  Tipo Luz
                </option>

                <option value="neo-xport-inversion">
                  Comprar para inversión
                </option>

                <option value="neo-xport-financiamiento">
                  Conocer opciones de
                  financiamiento
                </option>

                <option value="neo-xport-visita">
                  Agendar una visita
                </option>

                <option value="neo-xport-asesoria">
                  Asesoría personalizada
                </option>
              </select>
            </label>

            <label>
              Mensaje opcional

              <textarea
                name="message"
                placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
                rows={4}
                maxLength={250}
                disabled={isSending}
              />
            </label>

            <label
              className={styles.checkbox}
            >
              <input
                type="checkbox"
                name="consent"
                value="accepted"
                disabled={isSending}
                required
              />

              <span>
                Acepto ser contactado por
                ANCOSUR para recibir
                información comercial sobre
                Neo Xport.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
            >
              {isSending
                ? "Enviando solicitud..."
                : "Solicitar información"}

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </button>
          </form>
        </div>
      </section>

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ?? "info"
        }
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}