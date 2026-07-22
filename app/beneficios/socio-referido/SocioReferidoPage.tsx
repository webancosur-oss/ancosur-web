"use client";

import {
  FileTextIcon,
  UploadSimpleIcon,
  UserIcon,
} from "@phosphor-icons/react";
import {
  FormEvent,
  useState,
} from "react";

import Navbar from "@/components/Navbar";
import styles from "./SocioReferidoPage.module.css";

const referralProjects = [
  "Neo Xport",
  "Neo Rivera",
  "Neo Eterna",
  "Neo Balto",
  "Neo Emperatriz",
  "Distrito San Carlos",
  "Neo Origen",
  "Neo 18",
  "Moro 416",
  "Camino Real",
  "Las Colinas de Moro",
  "Zagari Resort Club",
  "Por definir",
];

type ApiResponse = {
  success?: boolean;
  message?: string;
  response?: string;
};

export default function SocioReferidoPage() {
  const [isSending, setIsSending] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const readResponse = async (
    response: Response
  ): Promise<ApiResponse> => {
    const contentType =
      response.headers.get("content-type");

    if (
      contentType?.includes(
        "application/json"
      )
    ) {
      return response.json();
    }

    return {
      message: await response.text(),
    };
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setError("");
    setMessage("");

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData =
      new FormData(form);

    const referrerFullName =
      String(
        formData.get(
          "referrerFullName"
        ) ?? ""
      ).trim();

    const referrerDni =
      String(
        formData.get(
          "referrerDni"
        ) ?? ""
      ).replace(/\D/g, "");

    const referrerPhone =
      String(
        formData.get(
          "referrerPhone"
        ) ?? ""
      ).replace(/\D/g, "");

    const referrerEmail =
      String(
        formData.get(
          "referrerEmail"
        ) ?? ""
      )
        .trim()
        .toLowerCase();

    const referredFullName =
      String(
        formData.get(
          "referredFullName"
        ) ?? ""
      ).trim();

    const referredDni =
      String(
        formData.get(
          "referredDni"
        ) ?? ""
      ).replace(/\D/g, "");

    const referredPhone =
      String(
        formData.get(
          "referredPhone"
        ) ?? ""
      ).replace(/\D/g, "");

    const referredEmail =
      String(
        formData.get(
          "referredEmail"
        ) ?? ""
      )
        .trim()
        .toLowerCase();

    const project =
      String(
        formData.get(
          "project"
        ) ?? ""
      ).trim();

    const consent =
      formData.get(
        "referralConsent"
      ) === "accepted";

    /* =====================================================
       VALIDACIONES
    ===================================================== */

    if (
      referrerDni.length !== 8 ||
      referredDni.length !== 8
    ) {
      setError(
        "El DNI debe contener exactamente 8 números."
      );
      return;
    }

    if (
      !/^9\d{8}$/.test(
        referrerPhone
      ) ||
      !/^9\d{8}$/.test(
        referredPhone
      )
    ) {
      setError(
        "El celular debe tener 9 números y comenzar con 9."
      );
      return;
    }

    if (!referrerFullName) {
      setError(
        "Ingresa los nombres y apellidos del referente."
      );
      return;
    }

    if (!referredFullName) {
      setError(
        "Ingresa los nombres y apellidos del referido."
      );
      return;
    }

    if (!project) {
      setError(
        "Selecciona el proyecto de interés."
      );
      return;
    }

    if (!consent) {
      setError(
        "Debes aceptar los términos y condiciones."
      );
      return;
    }

    /* =====================================================
       DATOS PARA API
    ===================================================== */

    const referralData = {
      referrerFullName,
      referrerDni,
      referrerPhone,
      referrerEmail,

      referredFullName,
      referredDni,
      referredPhone,
      referredEmail,

      project,
      consent,

      campaign:
        "socio-referido-web",

      campania_nombre:
        "Socio Referido ANCOSUR",

      origen_ruta:
        window.location.pathname,

      origen_componente:
        "Formulario Socio Referido",
    };

    try {
      setIsSending(true);

      const response =
        await fetch(
          "/api/referral-leads",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify(
              referralData
            ),
          }
        );

      const result =
        await readResponse(
          response
        );

      if (!response.ok) {
        if (
          result.response ===
          "referral.referrer_not_found"
        ) {
          setError(
            "El referente no está registrado como cliente ANCOSUR."
          );
          return;
        }

        if (
          result.response ===
          "referral.already_exists"
        ) {
          setError(
            "Esta persona ya fue registrada anteriormente como referido."
          );
          return;
        }

        setError(
          result.message ||
            "No pudimos registrar el referido."
        );

        return;
      }

      form.reset();

      setMessage(
        "¡Referido registrado correctamente! Nuestro equipo comercial se comunicará con la persona referida."
      );
    } catch {
      setError(
        "No pudimos enviar tus datos. Verifica tu conexión e inténtalo nuevamente."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>
              SOCIO REFERIDO ANCOSUR
            </span>

            <h1>
              ¡Gana S/ 500 por referir!
            </h1>

            <p>
              Si eres propietario ANCOSUR,
              recomienda nuestros proyectos
              y recibe un beneficio cuando
              tu referido concrete su compra.
            </p>
          </div>
        </section>

        <section className={styles.steps}>
          <article className={styles.stepCard}>
            <strong>1</strong>

            <UploadSimpleIcon
              size={56}
              weight="fill"
            />

            <h2>
              Ingresa tus datos
            </h2>

            <p>
              Registra tu información y
              los datos de la persona que
              deseas referir.
            </p>
          </article>

          <article className={styles.stepCard}>
            <strong>2</strong>

            <UserIcon
              size={56}
              weight="fill"
            />

            <h2>
              Contactamos al referido
            </h2>

            <p>
              Nuestro equipo comercial
              se comunica con la persona
              referida.
            </p>
          </article>

          <article className={styles.stepCard}>
            <strong>3</strong>

            <FileTextIcon
              size={56}
              weight="fill"
            />

            <h2>
              Ganas tu beneficio
            </h2>

            <p>
              Si el referido separa y
              firma la minuta de
              compraventa, accedes al
              beneficio de S/ 500.
            </p>
          </article>
        </section>

        <section className={styles.formSection}>
          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.formHeader}>
              <span>
                REGISTRO DE REFERIDO
              </span>

              <h2>
                Completa tus datos
              </h2>

              <p>
                Todos los campos son
                obligatorios.
              </p>
            </div>

            <div className={styles.formTitle}>
              <h3>
                Datos del referente
              </h3>

              <p>
                Ingresa tus datos como
                propietario ANCOSUR.
              </p>
            </div>

            <div className={styles.formGrid}>
              <input
                type="text"
                name="referrerFullName"
                placeholder="Nombres y apellidos"
                minLength={3}
                maxLength={100}
                autoComplete="name"
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="referrerDni"
                placeholder="DNI — 8 números"
                inputMode="numeric"
                pattern="[0-9]{8}"
                maxLength={8}
                required
                disabled={isSending}
              />

              <input
                type="tel"
                name="referrerPhone"
                placeholder="Celular — 9 números"
                inputMode="numeric"
                pattern="9[0-9]{8}"
                maxLength={9}
                autoComplete="tel"
                required
                disabled={isSending}
              />

              <input
                type="email"
                name="referrerEmail"
                placeholder="Correo electrónico"
                autoComplete="email"
                required
                disabled={isSending}
              />
            </div>

            <div className={styles.formTitle}>
              <h3>
                Datos del referido
              </h3>

              <p>
                Persona interesada en
                adquirir un proyecto ANCOSUR.
              </p>
            </div>

            <div className={styles.formGrid}>
              <input
                type="text"
                name="referredFullName"
                placeholder="Nombres y apellidos"
                minLength={3}
                maxLength={100}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="referredDni"
                placeholder="DNI — 8 números"
                inputMode="numeric"
                pattern="[0-9]{8}"
                maxLength={8}
                required
                disabled={isSending}
              />

              <input
                type="tel"
                name="referredPhone"
                placeholder="Celular — 9 números"
                inputMode="numeric"
                pattern="9[0-9]{8}"
                maxLength={9}
                required
                disabled={isSending}
              />

              <input
                type="email"
                name="referredEmail"
                placeholder="Correo electrónico"
                required
                disabled={isSending}
              />
            </div>

            <div className={styles.formTitle}>
              <h3>
                Proyecto de interés
              </h3>

              <p>
                Selecciona el proyecto que
                le interesa a tu referido.
              </p>
            </div>

            <select
              name="project"
              defaultValue=""
              required
              disabled={isSending}
            >
              <option
                value=""
                disabled
              >
                Selecciona un proyecto
              </option>

              {referralProjects.map(
                (project) => (
                  <option
                    key={project}
                    value={project}
                  >
                    {project ===
                    "Por definir"
                      ? "Aún no sabe qué proyecto elegir"
                      : project}
                  </option>
                )
              )}
            </select>

            <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="referralConsent"
              value="accepted"
              defaultChecked
              required
              disabled={isSending}
            />

            <span>
              He leído y acepto los Términos y Condiciones y la{" "}
              <a
                href="/politicas/politica-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </a>
              .
            </span>
          </label>
            {error && (
              <div
                className={styles.error}
                role="alert"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                className={styles.success}
                role="status"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
            >
              {isSending
                ? "Enviando..."
                : "Registrar referido"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}