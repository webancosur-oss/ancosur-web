"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

import { type CampoPopup, type PopupWeb, urlAfichePopup } from "@/data/popupWeb";
import { ProyectosWebAPI } from "@/data/proyectosWeb";
import { isOptimizableImage } from "@/src/seo";
import type { ProyectoWeb } from "@/src/types/proyectoWeb";

import { popupStorageKey } from "./CampaignPopupLazy";

import styles from "./CampaignPopup.module.css";

/* =========================================================
   POPUP DE CAMPAÑA (configurado desde el CRM)
   - Escritorio/tablet: ventana centrada (afiche + formulario).
   - Móvil: tarjeta compacta abajo; el botón despliega el
     formulario (formato aceptado por Google).
   Los campos del formulario vienen del CRM (popup.campos).
   El envío usa el mismo camino que el resto de formularios
   (POST /api/leads → CRM) y el evento lead_form_submit.
========================================================= */

type Valores = Record<string, string>;
type Errores = Record<string, string | undefined>;

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,80}$/;
const PHONE_REGEX = /^9\d{8}$/;
const EMAIL_REGEX = /^[^@\s,;]+@[^@\s,;]+\.[a-z]{2,}$/i;
const DNI_REGEX = /^\d{8}$/;
const MAX_PARRAFO = 500;

const TIPOS_INTERES = [
  { valor: "Departamento", texto: "Departamentos", icono: "🏢" },
  { valor: "Lote", texto: "Lotes", icono: "🌳" },
] as const;

/* Solo proyectos activos con unidades en venta */
const isProjectAvailable = (project: ProyectoWeb) =>
  project.activo &&
  project.estado !== "vendido" &&
  !/FINALIZADO|ENTREGADO|VENDIDOS/i.test(project.etapa ?? "");

const digitos = (v: string) => v.replace(/\D/g, "");

/* Evento para Google Tag Manager (fuera del componente: aquí sí se puede tocar window). */
function enviarEventoGTM(datos: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(datos);
}

function validar(
  campos: CampoPopup[],
  valores: Valores,
  tipoInteres: string,
  consent: boolean,
): Errores {
  const errores: Errores = {};

  for (const c of campos) {
    const val = (valores[c.clave] ?? "").trim();
    const falta = c.obligatorio && !val;

    switch (c.tipo) {
      case "texto":
        if (c.clave === "nombre") {
          if (!NAME_REGEX.test(val.replace(/\s+/g, " "))) {
            errores[c.clave] = "Ingresa tu nombre (solo letras).";
          }
        } else if (falta) {
          errores[c.clave] = "Completa este campo.";
        } else if (val.length > 120) {
          errores[c.clave] = "Máximo 120 caracteres.";
        }
        break;
      case "telefono":
        if ((val || c.obligatorio) && !PHONE_REGEX.test(digitos(val))) {
          errores[c.clave] =
            "El celular debe tener 9 dígitos y empezar con 9.";
        }
        break;
      case "email":
        if ((val || c.obligatorio) && !EMAIL_REGEX.test(val)) {
          errores[c.clave] = "Escribe un correo válido.";
        }
        break;
      case "dni":
        if ((val || c.obligatorio) && !DNI_REGEX.test(digitos(val))) {
          errores[c.clave] = "El DNI tiene 8 dígitos.";
        }
        break;
      case "opciones":
        if (falta) errores[c.clave] = "Elige una opción.";
        break;
      case "proyecto":
        if (c.obligatorio && !tipoInteres) {
          errores[c.clave] = "Elige departamentos o lotes.";
        } else if (falta) {
          errores[c.clave] = "Selecciona el proyecto de tu interés.";
        }
        break;
      case "parrafo":
        if (falta) {
          errores[c.clave] = "Escribe tu mensaje.";
        } else if (val.length > MAX_PARRAFO) {
          errores[c.clave] = `El mensaje no debe superar los ${MAX_PARRAFO} caracteres.`;
        }
        break;
    }
  }

  if (!consent) {
    errores.consent = "Debes aceptar ser contactado.";
  }

  return errores;
}

type CampaignPopupProps = {
  popup: PopupWeb;
  onClose: () => void;
};

export default function CampaignPopup({
  popup,
  onClose,
}: CampaignPopupProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const campos = popup.campos.filter((c) => c.visible);
  const campoProyecto = campos.find((c) => c.tipo === "proyecto");

  const afiche = popup.imagen_url
    ? {
        src: urlAfichePopup(popup.imagen_url),
        width: popup.imagen_ancho || 1081,
        height: popup.imagen_alto || 1351,
        /* En local la API es una IP privada y Next no la optimiza: se sirve tal cual (ya viene en WEBP). */
        unoptimized: !isOptimizableImage(urlAfichePopup(popup.imagen_url)),
      }
    : null;

  /* En pantallas grandes se abre directamente el formulario */
  const [expanded, setExpanded] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 641px)").matches
      : false,
  );

  const [valores, setValores] = useState<Valores>({});
  const [tipoInteres, setTipoInteres] = useState("");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<Errores>({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [projects, setProjects] = useState<ProyectoWeb[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const remember = () => {
    try {
      sessionStorage.setItem(popupStorageKey(popup.id), "1");
    } catch {
      /* sin sessionStorage: solo se cierra */
    }
  };

  const close = () => {
    remember();
    onClose();
  };

  /* Proyectos activos (solo si el formulario los pide y al desplegarlo) */
  useEffect(() => {
    if (!expanded || !campoProyecto || projects.length > 0) return;

    let cancelled = false;

    ProyectosWebAPI.listarActivos({ limit: 100, page: 1 })
      .then((response) => {
        if (!cancelled) {
          setProjects(
            response.data
              .filter(isProjectAvailable)
              .sort(
                (a, b) => Number(a.orden ?? 0) - Number(b.orden ?? 0),
              ),
          );
        }
      })
      .catch(() => {
        /* sin proyectos: se muestra el aviso en el formulario */
      })
      .finally(() => {
        if (!cancelled) setLoadingProjects(false);
      });

    return () => {
      cancelled = true;
    };
  }, [expanded, campoProyecto, projects.length]);

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

  const update = (clave: string, value: string) => {
    setValores((current) => ({ ...current, [clave]: value }));
    setErrors((current) => ({ ...current, [clave]: undefined, form: undefined }));
  };

  const elegirTipo = (tipo: string) => {
    setTipoInteres(tipo);
    if (campoProyecto) update(campoProyecto.clave, "");
  };

  const projectsByType = projects.filter(
    (project) => project.tipo === tipoInteres,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    const found = validar(campos, valores, tipoInteres, consent);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const valorDe = (tipo: CampoPopup["tipo"]) =>
      campos.find((c) => c.tipo === tipo)?.clave;
    const texto = (clave?: string) => (clave ? (valores[clave] ?? "").trim() : "");

    const fullName = texto("nombre").replace(/\s+/g, " ");
    const phone = digitos(texto(valorDe("telefono"))).slice(0, 9);
    const email = texto(valorDe("email")).toLowerCase();
    const dni = digitos(texto(valorDe("dni")));
    const proyecto = texto(campoProyecto?.clave);
    const mensajeClave =
      campos.find((c) => c.tipo === "parrafo" && c.clave === "mensaje")?.clave ??
      valorDe("parrafo");
    const mensaje = texto(mensajeClave);

    /* Los demás campos (texto, opciones, otros párrafos) van como
       preguntas adicionales del lead, con su clave. */
    const otros: Record<string, string> = {};
    for (const c of campos) {
      if (
        c.clave === "nombre" ||
        c.tipo === "telefono" ||
        c.tipo === "email" ||
        c.tipo === "dni" ||
        c.tipo === "proyecto" ||
        c.clave === mensajeClave
      ) {
        continue;
      }
      const v = texto(c.clave);
      if (v) otros[c.clave] = v;
    }

    const params = new URLSearchParams(window.location.search);
    const campaign = popup.campana;

    const payload = {
      ...otros,
      codigo_formulario: `popup-web-${popup.id}`,
      nombre_formulario: campaign,
      tipo_formulario: "popup",
      nombre: fullName,
      telefono: phone,
      email,
      dni,
      mensaje: mensaje || `Interesado en ${popup.nombre}.`,
      proyecto,
      tipo_inmueble: tipoInteres,
      interes: [tipoInteres, proyecto].filter(Boolean).join(" - "),
      horario_visita: "",
      campania: campaign,
      anuncio: `Pop-up web · ${popup.nombre}`,
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
      const response = await fetch("/api/leads", {
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

      enviarEventoGTM({
        event: "lead_form_submit",
        form_name: payload.nombre_formulario,
        form_code: payload.codigo_formulario,
        form_type: payload.tipo_formulario,
        lead_type: "Promoción",
        project: proyecto,
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

  const tituloCompleto = [popup.titulo, popup.resaltado].filter(Boolean).join(" ");
  const nombreCorto = (valores.nombre ?? "").trim().split(" ")[0];

  /* ---------------------------------------------------------
     MÓVIL · TARJETA COMPACTA
  --------------------------------------------------------- */

  if (!expanded) {
    return (
      <aside className={styles.teaser} aria-label={tituloCompleto}>
        {afiche && (
          <Image
            src={afiche.src}
            alt=""
            width={afiche.width}
            height={afiche.height}
            sizes="72px"
            quality={90}
            className={styles.teaserImage}
            unoptimized={afiche.unoptimized}
          />
        )}

        <div className={styles.teaserBody}>
          {popup.antetitulo && (
            <span className={styles.teaserEyebrow}>{popup.antetitulo}</span>
          )}
          <strong>{tituloCompleto}</strong>
          {popup.vigencia_texto && <span>{popup.vigencia_texto}</span>}

          <button
            type="button"
            className={styles.teaserButton}
            onClick={() => setExpanded(true)}
          >
            {popup.texto_boton}
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

  const dialogStyle = afiche
    ? ({ "--popup-ratio": `${afiche.width} / ${afiche.height}` } as CSSProperties)
    : undefined;

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className={styles.dialog}
        style={dialogStyle}
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

        {afiche && (
          <div className={styles.media}>
            <Image
              src={afiche.src}
              alt={tituloCompleto}
              width={afiche.width}
              height={afiche.height}
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 520px"
              quality={90}
              className={styles.mediaImage}
              unoptimized={afiche.unoptimized}
              priority
            />
          </div>
        )}

        <div className={styles.content}>
          {sent ? (
            <div className={styles.success} aria-live="polite">
              <CheckCircleIcon size={52} weight="fill" aria-hidden="true" />
              <h2 id={titleId}>¡Listo{nombreCorto ? `, ${nombreCorto}` : ""}!</h2>
              <p>
                {popup.mensaje_exito ||
                  "Recibimos tus datos. Un asesor de Ancosur te contactará muy pronto por teléfono o WhatsApp."}
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
              <div className={styles.heading}>
                {/* Móvil: afiche completo en miniatura (sin recortes) */}
                {afiche && (
                  <Image
                    src={afiche.src}
                    alt=""
                    width={afiche.width}
                    height={afiche.height}
                    sizes="112px"
                    quality={90}
                    className={styles.headingThumb}
                    unoptimized={afiche.unoptimized}
                  />
                )}

                <div>
                  {(popup.antetitulo || popup.vigencia_texto) && (
                    <span className={styles.eyebrow}>
                      {popup.antetitulo}
                      {popup.vigencia_texto && (
                        <span className={styles.badge}>{popup.vigencia_texto}</span>
                      )}
                    </span>
                  )}

                  <h2 id={titleId} className={styles.title}>
                    {popup.titulo}
                    {popup.resaltado && <span> {popup.resaltado}</span>}
                  </h2>
                </div>
              </div>

              {popup.resumen && <p className={styles.summary}>{popup.resumen}</p>}

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                {campos.map((c, index) => {
                  const error = errors[c.clave];
                  const valor = valores[c.clave] ?? "";
                  const obligatorio = c.obligatorio;

                  if (c.tipo === "parrafo") {
                    return (
                      <label key={c.clave} className={styles.field}>
                        <span>{c.etiqueta}</span>
                        <textarea
                          rows={3}
                          maxLength={MAX_PARRAFO}
                          placeholder={c.marcador || undefined}
                          value={valor}
                          onChange={(event) => update(c.clave, event.target.value)}
                          aria-invalid={Boolean(error)}
                          required={obligatorio}
                          disabled={isSending}
                        />
                        <span className={styles.counter}>
                          {valor.length}/{MAX_PARRAFO} caracteres
                        </span>
                        {error && <small>{error}</small>}
                      </label>
                    );
                  }

                  if (c.tipo === "opciones") {
                    return (
                      <div key={c.clave} className={styles.field}>
                        <span id={`${titleId}-${c.clave}`}>{c.etiqueta}</span>
                        <div
                          className={styles.typeTabs}
                          role="radiogroup"
                          aria-labelledby={`${titleId}-${c.clave}`}
                        >
                          {c.opciones.map((opcion) => (
                            <button
                              key={opcion}
                              type="button"
                              role="radio"
                              aria-checked={valor === opcion}
                              className={`${styles.typeTab} ${
                                valor === opcion ? styles.typeTabActive : ""
                              }`}
                              onClick={() => update(c.clave, opcion)}
                              disabled={isSending}
                            >
                              {opcion}
                            </button>
                          ))}
                        </div>
                        {error && <small>{error}</small>}
                      </div>
                    );
                  }

                  if (c.tipo === "proyecto") {
                    return (
                      <div key={c.clave} className={styles.field}>
                        <span id={`${titleId}-interes`}>{c.etiqueta}</span>

                        <div
                          className={styles.typeTabs}
                          role="radiogroup"
                          aria-labelledby={`${titleId}-interes`}
                        >
                          {TIPOS_INTERES.map((tipo) => (
                            <button
                              key={tipo.valor}
                              type="button"
                              role="radio"
                              aria-checked={tipoInteres === tipo.valor}
                              className={`${styles.typeTab} ${
                                tipoInteres === tipo.valor ? styles.typeTabActive : ""
                              }`}
                              onClick={() => elegirTipo(tipo.valor)}
                              disabled={isSending}
                            >
                              <span aria-hidden="true">{tipo.icono}</span>
                              {tipo.texto}
                            </button>
                          ))}
                        </div>

                        {tipoInteres && (
                          <div
                            className={styles.projectList}
                            role="radiogroup"
                            aria-label="Proyectos disponibles"
                          >
                            {loadingProjects ? (
                              <span className={styles.projectHint}>
                                Cargando proyectos…
                              </span>
                            ) : projectsByType.length === 0 ? (
                              <span className={styles.projectHint}>
                                No hay proyectos disponibles en este momento.
                              </span>
                            ) : (
                              projectsByType.map((project) => (
                                <button
                                  key={project.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={valor === project.titulo}
                                  className={`${styles.projectChip} ${
                                    valor === project.titulo
                                      ? styles.projectChipActive
                                      : ""
                                  }`}
                                  onClick={() => update(c.clave, project.titulo)}
                                  disabled={isSending}
                                >
                                  <strong>{project.titulo}</strong>
                                  <small>
                                    {project.ciudad}
                                    {project.etapa ? ` · ${project.etapa}` : ""}
                                  </small>
                                </button>
                              ))
                            )}
                          </div>
                        )}
                        {error && <small>{error}</small>}
                      </div>
                    );
                  }

                  const esTelefono = c.tipo === "telefono";
                  const esDNI = c.tipo === "dni";
                  const esEmail = c.tipo === "email";

                  return (
                    <label key={c.clave} className={styles.field}>
                      <span>{c.etiqueta}</span>
                      <input
                        ref={index === 0 ? firstFieldRef : undefined}
                        type={esEmail ? "email" : esTelefono ? "tel" : "text"}
                        inputMode={esTelefono || esDNI ? "numeric" : undefined}
                        autoComplete={
                          c.clave === "nombre"
                            ? "name"
                            : esTelefono
                              ? "tel-national"
                              : esEmail
                                ? "email"
                                : "off"
                        }
                        maxLength={esTelefono ? 9 : esDNI ? 8 : 120}
                        placeholder={c.marcador || undefined}
                        value={valor}
                        onChange={(event) =>
                          update(
                            c.clave,
                            esTelefono || esDNI
                              ? digitos(event.target.value)
                              : event.target.value,
                          )
                        }
                        aria-invalid={Boolean(error)}
                        required={obligatorio}
                        disabled={isSending}
                      />
                      {error && <small>{error}</small>}
                    </label>
                  );
                })}

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setErrors((current) => ({ ...current, consent: undefined }));
                    }}
                    disabled={isSending}
                  />
                  <span>
                    Acepto los{" "}
                    <a
                      href="/politicas/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.termsLink}
                    >
                      términos y la política de privacidad
                    </a>{" "}
                    y autorizo ser contactado por Ancosur para recibir
                    información comercial.
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
                  {isSending ? "Enviando..." : popup.texto_boton}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
