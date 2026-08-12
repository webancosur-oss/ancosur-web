"use client";

import {
  FilePdfIcon,
  PaperPlaneTiltIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import styles from "./JobApplicationForm.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/postulaciones`
    : "https://ancosur-api-production.up.railway.app/api/postulaciones";

const MAX_CV_SIZE =
  5 * 1024 * 1024;

type JobApplicationFormProps = {
  jobId: string;
  jobTitle: string;
  area?: string;
};

type Feedback = {
  type: "success" | "error";
  message: string;
} | null;

export default function JobApplicationForm({
  jobId,
  jobTitle,
  area = "",
}: JobApplicationFormProps) {
  const [isSending, setIsSending] =
    useState(false);

  const [feedback, setFeedback] =
    useState<Feedback>(null);

  const [
    selectedFile,
    setSelectedFile,
  ] = useState<File | null>(null);

  const handleFileChange = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ??
      null;

    setFeedback(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const isPdf =
      file.type ===
        "application/pdf" ||
      file.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      event.target.value = "";

      setSelectedFile(null);

      setFeedback({
        type: "error",
        message:
          "El CV debe estar en formato PDF.",
      });

      return;
    }

    if (
      file.size >
      MAX_CV_SIZE
    ) {
      event.target.value = "";

      setSelectedFile(null);

      setFeedback({
        type: "error",
        message:
          "El CV no debe superar los 5 MB.",
      });

      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (
    event:
      FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const form =
      event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data =
      new FormData(form);

    const fullName =
      String(
        data.get("fullName") ??
          ""
      )
        .replace(/\s+/g, " ")
        .trim();

    const phone =
      String(
        data.get("phone") ?? ""
      )
        .replace(/\D/g, "")
        .slice(0, 9);

    const email =
      String(
        data.get("email") ?? ""
      )
        .trim()
        .toLowerCase();

    const message =
      String(
        data.get("message") ?? ""
      )
        .trim()
        .slice(0, 500);

    const consent =
      data.get("consent") ===
      "accepted";

    const cv =
      data.get("cv");

    const nameRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'’-]{3,120}$/;

    const phoneRegex =
      /^9\d{8}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (
      !nameRegex.test(fullName)
    ) {
      setFeedback({
        type: "error",
        message:
          "Ingresa tu nombre completo correctamente.",
      });

      return;
    }

    if (
      !phoneRegex.test(phone)
    ) {
      setFeedback({
        type: "error",
        message:
          "El celular debe tener 9 dígitos y comenzar con 9.",
      });

      return;
    }

    if (
      !emailRegex.test(email)
    ) {
      setFeedback({
        type: "error",
        message:
          "Ingresa un correo electrónico válido.",
      });

      return;
    }

    if (!consent) {
      setFeedback({
        type: "error",
        message:
          "Debes aceptar la autorización para enviar tu postulación.",
      });

      return;
    }

    if (
      !(
        cv instanceof File
      ) ||
      cv.size === 0
    ) {
      setFeedback({
        type: "error",
        message:
          "Debes adjuntar tu CV en PDF.",
      });

      return;
    }

    const isPdf =
      cv.type ===
        "application/pdf" ||
      cv.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      setFeedback({
        type: "error",
        message:
          "El CV debe estar en formato PDF.",
      });

      return;
    }

    if (
      cv.size >
      MAX_CV_SIZE
    ) {
      setFeedback({
        type: "error",
        message:
          "El CV no debe superar los 5 MB.",
      });

      return;
    }

    const params =
      new URLSearchParams(
        window.location.search
      );

    const payload =
      new FormData();

    payload.append(
      "vacante_id",
      jobId
    );

    payload.append(
      "vacante_titulo",
      jobTitle
    );

    payload.append(
      "area",
      area || jobTitle
    );

    payload.append(
      "nombre",
      fullName
    );

    payload.append(
      "telefono",
      phone
    );

    payload.append(
      "email",
      email
    );

    payload.append(
      "mensaje",
      message
    );

    payload.append(
      "cv",
      cv
    );

    payload.append(
      "ruta_pagina",
      window.location.pathname
    );

    payload.append(
      "url_pagina",
      window.location.href
    );

    payload.append(
      "pagina_referencia",
      document.referrer || ""
    );

    payload.append(
      "utm_source",
      params.get("utm_source") ?? ""
    );

    payload.append(
      "utm_medium",
      params.get("utm_medium") ?? ""
    );

    payload.append(
      "utm_campaign",
      params.get("utm_campaign") ?? ""
    );

    payload.append(
      "utm_content",
      params.get("utm_content") ?? ""
    );

    payload.append(
      "utm_term",
      params.get("utm_term") ?? ""
    );

    try {
      setIsSending(true);
      setFeedback(null);

      const response =
        await fetch(
          API_URL,
          {
            method: "POST",
            body: payload,
            cache: "no-store",
          }
        );

      const raw =
        await response.text();

      let result: any = {};

      if (raw) {
        try {
          result =
            JSON.parse(raw);
        } catch {
          setFeedback({
            type: "error",
            message:
              `La API respondió HTTP ${response.status} con una respuesta inválida.`,
          });

          return;
        }
      }

      if (
        !response.ok ||
        result.success !== true
      ) {
        setFeedback({
          type: "error",
          message:
            result.message ||
            result.error ||
            "No pudimos registrar tu postulación.",
        });

        return;
      }

      window.dataLayer =
        window.dataLayer || [];

      window.dataLayer.push({
        event:
          "job_application_submit",
        job_id:
          jobId,
        job_title:
          jobTitle,
        job_area:
          area || jobTitle,
        application_id:
          result.data?.id ?? "",
        cv_saved:
          result.data
            ?.cv_guardado === true,
        page_path:
          window.location.pathname,
      });

      form.reset();

      setSelectedFile(null);

      setFeedback({
        type: "success",
        message:
          result.message ||
          "Tu postulación fue registrada correctamente.",
      });
    } catch (error) {
      console.error(
        "Error enviando postulación:",
        error
      );

      setFeedback({
        type: "error",
        message:
          "No pudimos conectar con el servidor. Inténtalo nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className={
        styles.form
      }
      onSubmit={
        handleSubmit
      }
      encType="multipart/form-data"
    >
      <div
        className={
          styles.grid
        }
      >
        <label
          className={
            styles.full
          }
        >
          <span>
            Nombre completo
          </span>

          <input
            type="text"
            name="fullName"
            placeholder="Ej. Brayan Basurto"
            autoComplete="name"
            minLength={3}
            maxLength={120}
            disabled={isSending}
            required
          />
        </label>

        <label>
          <span>
            Celular
          </span>

          <input
            type="tel"
            name="phone"
            placeholder="987654321"
            autoComplete="tel"
            inputMode="numeric"
            pattern="9[0-9]{8}"
            maxLength={9}
            disabled={isSending}
            onInput={(event) => {
              event.currentTarget.value =
                event.currentTarget.value
                  .replace(/\D/g, "")
                  .slice(0, 9);
            }}
            required
          />
        </label>

        <label>
          <span>
            Correo electrónico
          </span>

          <input
            type="email"
            name="email"
            placeholder="correo@gmail.com"
            autoComplete="email"
            maxLength={150}
            disabled={isSending}
            required
          />
        </label>

        <label
          className={
            styles.full
          }
        >
          <span>
            Cuéntanos sobre ti
          </span>

          <textarea
            name="message"
            placeholder="Puedes contarnos brevemente sobre tu experiencia..."
            maxLength={500}
            disabled={isSending}
          />
        </label>

        <label
          className={
            styles.full
          }
        >
          <span>
            Curriculum Vitae
          </span>

          <div
            className={
              selectedFile
                ? styles.cvSelectedBox
                : styles.cvUpload
            }
          >
            <input
              type="file"
              name="cv"
              accept=".pdf,application/pdf"
              onChange={
                handleFileChange
              }
              disabled={isSending}
              required
            />

            {selectedFile ? (
              <div
                className={
                  styles.cvSelected
                }
              >
                <FilePdfIcon
                  size={30}
                  weight="fill"
                />

                <div>
                  <strong>
                    {
                      selectedFile.name
                    }
                  </strong>

                  <span>
                    {(
                      selectedFile.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={
                  styles.cvPlaceholder
                }
              >
                <UploadSimpleIcon
                  size={30}
                  weight="duotone"
                />

                <strong>
                  Adjunta tu CV
                </strong>

                <span>
                  Solo PDF · Máximo 5 MB
                </span>
              </div>
            )}
          </div>
        </label>
      </div>

      <label
        className={
          styles.consent
        }
      >
        <input
          type="checkbox"
          name="consent"
          value="accepted"
          disabled={isSending}
          required
        />

        <span>
          Autorizo a Ancosur a
          utilizar mis datos
          personales y CV para
          gestionar mi postulación.
        </span>
      </label>

      {feedback && (
        <div
          className={
            feedback.type ===
            "success"
              ? styles.success
              : styles.error
          }
        >
          {
            feedback.message
          }
        </div>
      )}

      <button
        type="submit"
        className={
          styles.submit
        }
        disabled={
          isSending
        }
      >
        <PaperPlaneTiltIcon
          size={18}
          weight="bold"
        />

        {isSending
          ? "Enviando postulación..."
          : "Enviar postulación"}
      </button>
    </form>
  );
}