"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  PaperPlaneTiltIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import ShowroomDaysLeft from "@/components/home/ShowroomDaysLeft";
import { ProyectosWebAPI } from "@/data/proyectosWeb";
import type { ProyectoWeb } from "@/src/types/proyectoWeb";

import { popupStorageKey } from "./CampaignPopupLazy";
import type { PopupPromotion } from "./types";

import styles from "./CampaignPopup.module.css";

/* =========================================================
   POPUP DE CAMPAÑA
   - Escritorio/tablet: ventana centrada (afiche + formulario).
   - Móvil: tarjeta compacta abajo; "Quiero información"
     despliega el formulario (formato aceptado por Google).
   El envío usa el mismo formato que el resto de formularios
   (POST /api/formularios) y el evento lead_form_submit.
========================================================= */

type InterestType = "Departamento" | "Lote";

type FormState = {
  fullName: string;
  phone: string;
  interestType: InterestType | "";
  project: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState | "form", string>>;

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ancosur-api-production.up.railway.app"
).replace(/\/+$/, "");

const INITIAL_FORM: FormState = {
  fullName: "",
  phone: "",
  interestType: "",
  project: "",
  consent: true,
};

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;
const PHONE_REGEX = /^9\d{8}$/;

/* Solo proyectos activos con unidades en venta */
const isProjectAvailable = (project: ProyectoWeb) =>
  project.activo &&
  project.estado !== "vendido" &&
  !/FINALIZADO|ENTREGADO|VENDIDOS/i.test(project.etapa ?? "");

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!NAME_REGEX.test(form.fullName.replace(/\s+/g, " ").trim())) {
    errors.fullName = "Ingresa tu nombre (solo letras).";
  }

  if (!PHONE_REGEX.test(form.phone.replace(/\D/g, ""))) {
    errors.phone = "El celular debe tener 9 dígitos y empezar con 9.";
  }

  if (!form.interestType) {
    errors.interestType = "Elige departamentos o lotes.";
  } else if (!form.project) {
    errors.project = "Selecciona el proyecto de tu interés.";
  }

  if (!form.consent) {
    errors.consent = "Debes aceptar ser contactado.";
  }

  return errors;
};

type CampaignPopupProps = {
  promotion: PopupPromotion;
  onClose: () => void;
};

export default function CampaignPopup({
  promotion,
  onClose,
}: CampaignPopupProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  /* En pantallas grandes se abre directamente el formulario */
  const [expanded, setExpanded] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 641px)").matches
      : false,
  );

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [projects, setProjects] = useState<ProyectoWeb[]>([]);

  const remember = () => {
    try {
      sessionStorage.setItem(popupStorageKey(promotion.id), "1");
    } catch {
      /* sin sessionStorage: solo se cierra */
    }
  };

  const close = () => {
    remember();
    onClose();
  };

  /* Proyectos activos (solo al desplegar el formulario) */
  useEffect(() => {
    if (!expanded || projects.length > 0) return;

    let cancelled = false;

    ProyectosWebAPI.listarActivos({ limit: 100, page: 1 })
      .then((response) => {
        if (!cancelled) {
          setProjects(response.data.filter(isProjectAvailable));
        }
      })
      .catch(() => {
        /* el formulario sigue funcionando con "Aún no lo sé" */
      });

    return () => {
      cancelled = true;
    };
  }, [expanded, projects.length]);

  /* Escape cierra; con el formulario abierto se bloquea el
     scroll de fondo y el foco va al primer campo. */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const root = document.documentElement;
    const previous = root.style.overflow;

    root.style.overflow = "hidden";
    firstFieldRef.current?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = previous;
    };
  }, [expanded]);

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "interestType" ? { project: "" } : {}),
    }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
  };

  const projectOptions = projects
    .filter((project) => project.tipo === form.interestType)
    .map((project) => project.titulo)
    .filter(Boolean);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    const found = validate(form);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const fullName = form.fullName.replace(/\s+/g, " ").trim();
    const phone = form.phone.replace(/\D/g, "").slice(0, 9);
    const params = new URLSearchParams(window.location.search);
    /* Mismo nombre que el popup anterior para no romper los
       filtros y reportes del CRM. La promoción va en el mensaje. */
    const campaign = "Formulario Aterrador";

    const payload = {
      codigo_formulario: "Formulario Aterrador",
      nombre_formulario: "Formulario Aterrador",
      tipo_formulario: "promocion",
      nombre: fullName,
      telefono: phone,
      email: "",
      dni: "",
      mensaje: `Interesado en ${promotion.name}.`,
      proyecto: form.project,
      tipo_inmueble: form.interestType,
      interes: `${form.interestType} - ${form.project}`,
      horario_visita: "",
      campania: campaign,
      anuncio: "Formulario Aterrador - Popup web Ancosur",
      fuente_id: 4,
      ruta_pagina: window.location.pathname,
      url_pagina: window.location.href,
      pagina_referencia: document.referrer || "",
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? "",
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    setIsSending(true);

    try {
      const response = await fetch(`${API_URL}/api/formularios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });

      const result: {
        success?: boolean;
        message?: string;
        data?: {
          id?: string | number;
          crm?: { success?: boolean; lead_id?: string | number };
        };
      } = await response.json().catch(() => ({}));

      if (!response.ok || result.success !== true) {
        setErrors({
          form:
            result.message ||
            "No pudimos enviar tus datos. Inténtalo nuevamente.",
        });
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_submit",
        form_name: payload.nombre_formulario,
        form_code: payload.codigo_formulario,
        form_type: payload.tipo_formulario,
        lead_type: "Promoción",
        project: form.project,
        campaign,
        source_id: payload.fuente_id,
        page_path: payload.ruta_pagina,
        local_lead_id: result.data?.id ?? "",
        crm_sent: result.data?.crm?.success === true,
        crm_lead_id: result.data?.crm?.lead_id ?? "",
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
      });

      remember();
      setSent(true);
    } catch {
      setErrors({
        form: "Revisa tu conexión a Internet e inténtalo nuevamente.",
      });
    } finally {
      window.clearTimeout(timeout);
      setIsSending(false);
    }
  };

  /* ---------------------------------------------------------
     MÓVIL · TARJETA COMPACTA
  --------------------------------------------------------- */

  if (!expanded) {
    return (
      <aside
        className={styles.teaser}
        aria-label={promotion.name}
      >
        <Image
          src={promotion.image}
          alt=""
          width={76}
          height={76}
          sizes="76px"
          className={styles.teaserImage}
        />

        <div className={styles.teaserBody}>
          <strong>{promotion.name}</strong>
          <span>
            {promotion.id === "showroom" ? (
              <ShowroomDaysLeft className={styles.badge} />
            ) : (
              promotion.validityLabel
            )}
          </span>

          <button
            type="button"
            className={styles.teaserButton}
            onClick={() => setExpanded(true)}
          >
            Quiero información
            <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className={styles.teaserClose}
          onClick={close}
          aria-label="Cerrar"
        >
          <XIcon size={16} weight="bold" aria-hidden="true" />
        </button>
      </aside>
    );
  }

  /* ---------------------------------------------------------
     VENTANA / HOJA CON FORMULARIO
  --------------------------------------------------------- */

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Cerrar"
        >
          <XIcon size={18} weight="bold" aria-hidden="true" />
        </button>

        <div className={styles.media}>
          <Image
            src={promotion.image}
            alt={promotion.imageAlt}
            width={promotion.imageWidth}
            height={promotion.imageHeight}
            sizes="(max-width: 640px) 120px, 340px"
            className={styles.mediaImage}
          />
        </div>

        <div className={styles.content}>
          {sent ? (
            <div className={styles.success} aria-live="polite">
              <CheckCircleIcon size={52} weight="fill" aria-hidden="true" />
              <h2 id={titleId}>¡Listo, {form.fullName.split(" ")[0]}!</h2>
              <p>
                Recibimos tus datos. Un asesor de Ancosur te contactará
                muy pronto por teléfono o WhatsApp.
              </p>
              <button
                type="button"
                className={styles.submit}
                onClick={onClose}
              >
                Seguir navegando
              </button>
            </div>
          ) : (
            <>
              <span className={styles.eyebrow}>
                {promotion.eyebrow}
                {promotion.id === "showroom" && (
                  <ShowroomDaysLeft className={styles.badge} />
                )}
              </span>

              <h2 id={titleId} className={styles.title}>
                {promotion.title}
                <span> {promotion.highlight}</span>
              </h2>

              <p className={styles.summary}>{promotion.summary}</p>

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                <label className={styles.field}>
                  <span>Nombre completo</span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(event) =>
                      update("fullName", event.target.value)
                    }
                    aria-invalid={Boolean(errors.fullName)}
                    disabled={isSending}
                  />
                  {errors.fullName && <small>{errors.fullName}</small>}
                </label>

                <label className={styles.field}>
                  <span>Celular</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={9}
                    placeholder="9XXXXXXXX"
                    value={form.phone}
                    onChange={(event) =>
                      update(
                        "phone",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    aria-invalid={Boolean(errors.phone)}
                    disabled={isSending}
                  />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>

                <fieldset className={styles.choices}>
                  <legend>Me interesa</legend>
                  {(["Departamento", "Lote"] as const).map((type) => (
                    <label
                      key={type}
                      className={`${styles.choice} ${
                        form.interestType === type ? styles.choiceActive : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="interestType"
                        value={type}
                        checked={form.interestType === type}
                        onChange={() => update("interestType", type)}
                        disabled={isSending}
                      />
                      {type === "Departamento" ? "Departamentos" : "Lotes"}
                    </label>
                  ))}
                  {errors.interestType && (
                    <small>{errors.interestType}</small>
                  )}
                </fieldset>

                {form.interestType && (
                  <label className={styles.field}>
                    <span>Proyecto</span>
                    <select
                      value={form.project}
                      onChange={(event) =>
                        update("project", event.target.value)
                      }
                      aria-invalid={Boolean(errors.project)}
                      disabled={isSending}
                    >
                      <option value="">Selecciona un proyecto</option>
                      {projectOptions.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                      <option value="Aún no lo sé">Aún no lo sé</option>
                    </select>
                    {errors.project && <small>{errors.project}</small>}
                  </label>
                )}

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      update("consent", event.target.checked)
                    }
                    disabled={isSending}
                  />
                  <span>
                    Acepto ser contactado por Ancosur sobre promociones y
                    proyectos.
                  </span>
                </label>
                {errors.consent && (
                  <small className={styles.formError}>
                    {errors.consent}
                  </small>
                )}

                {errors.form && (
                  <p className={styles.formError} role="alert">
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={isSending}
                >
                  {isSending ? "Enviando..." : "Quiero esta promoción"}
                  {!isSending && (
                    <PaperPlaneTiltIcon
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
