"use client";

import {
  FormEvent,
  useState,
} from "react";

import Navbar from "@/components/Navbar";

import styles from "./CompramosTerrenoPage.module.css";

export default function CompramosTerrenoPage() {
  const [isSending, setIsSending] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
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

    const formData =
      new FormData(form);

    const phone =
      String(
        formData.get("phone") ?? ""
      ).replace(/\D/g, "");

    const areaM2 =
      Number(
        formData.get("areaM2")
      );

    const priceRaw =
      String(
        formData.get("price") ?? ""
      ).trim();

    const price =
      priceRaw
        ? Number(priceRaw)
        : null;

    if (!/^9\d{8}$/.test(phone)) {
      setError(
        "El celular debe tener 9 números y comenzar con 9."
      );
      return;
    }

    if (
      !Number.isFinite(areaM2) ||
      areaM2 <= 0
    ) {
      setError(
        "Ingresa un área válida mayor a 0 m²."
      );
      return;
    }

    if (
      price !== null &&
      (!Number.isFinite(price) ||
        price < 0)
    ) {
      setError(
        "Ingresa un precio válido."
      );
      return;
    }

    const consent =
      formData.get(
        "consent"
      ) === "accepted";

    if (!consent) {
      setError(
        "Debes aceptar el consentimiento para ser contactado."
      );
      return;
    }

    const terrainData = {
      fullName:
        String(
          formData.get(
            "fullName"
          ) ?? ""
        ).trim(),

      phone,

      email:
        String(
          formData.get(
            "email"
          ) ?? ""
        )
          .trim()
          .toLowerCase(),

      location:
        String(
          formData.get(
            "location"
          ) ?? ""
        ).trim(),

      district:
        String(
          formData.get(
            "district"
          ) ?? ""
        ).trim(),

      reference:
        String(
          formData.get(
            "reference"
          ) ?? ""
        ).trim(),

      registryNumber:
        String(
          formData.get(
            "registryNumber"
          ) ?? ""
        ).trim(),

      currency:
        Number(
          formData.get(
            "currency"
          )
        ),

      price,

      areaM2,

      message:
        String(
          formData.get(
            "message"
          ) ?? ""
        ).trim(),

      consent,

      campaign:
        "compramos-tu-terreno-web",

      campania_nombre:
        "Compramos tu terreno",

      origen_ruta:
        window.location.pathname,

      origen_componente:
        "Formulario Compramos tu terreno",
    };

    try {
      setIsSending(true);
      setError("");
      setMessage("");

      const response =
        await fetch(
          "/api/terrain-leads",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify(
              terrainData
            ),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      const result =
        contentType?.includes(
          "application/json"
        )
          ? await response.json()
          : {
              message:
                await response.text(),
            };

      if (!response.ok) {
        setError(
          result.message ||
            "No pudimos registrar el terreno."
        );

        return;
      }

      form.reset();

      setMessage(
        "¡Datos enviados correctamente! Nuestro equipo evaluará tu propuesta y se comunicará contigo."
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
              COMPRAMOS TU TERRENO
            </span>

            <h1>
              Hacemos historia en tu propiedad
            </h1>

            <p>
              Buscamos terrenos con potencial
              para desarrollar nuevos proyectos
              inmobiliarios. Cuéntanos sobre
              tu propiedad y evaluaremos tu
              propuesta.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.header}>
              <span>
                PRESENTA TU PROPIEDAD
              </span>

              <h2>
                Cuéntanos sobre tu terreno
              </h2>

              <p>
                Completa el formulario y
                nuestro equipo se pondrá en
                contacto contigo.
              </p>
            </div>

            <div className={styles.formGrid}>
              <input
                type="text"
                name="fullName"
                placeholder="Nombres y apellidos"
                minLength={3}
                maxLength={100}
                required
                disabled={isSending}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Celular — 9 números"
                inputMode="numeric"
                pattern="9[0-9]{8}"
                maxLength={9}
                required
                disabled={isSending}
              />

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="location"
                placeholder="Ubicación del terreno"
                maxLength={150}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="district"
                placeholder="Distrito"
                maxLength={100}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="reference"
                placeholder="Referencia de ubicación"
                maxLength={180}
                disabled={isSending}
              />

              <input
                type="text"
                name="registryNumber"
                placeholder="N.° de partida registral"
                maxLength={80}
                disabled={isSending}
              />

              <select
                name="currency"
                defaultValue=""
                required
                disabled={isSending}
              >
                <option
                  value=""
                  disabled
                >
                  Moneda
                </option>

                <option value="1">
                  Soles
                </option>

                <option value="2">
                  Dólares
                </option>
              </select>

              <input
                type="number"
                name="price"
                placeholder="Precio referencial"
                inputMode="decimal"
                min="0"
                step="0.01"
                disabled={isSending}
              />

              <input
                type="number"
                name="areaM2"
                placeholder="Área total en m²"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                required
                disabled={isSending}
              />
            </div>

            <textarea
              name="message"
              placeholder="Información adicional sobre el terreno"
              rows={5}
              maxLength={500}
              disabled={isSending}
            />

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                value="accepted"
                required
                disabled={isSending}
              />

              <span>
                Acepto ser contactado por
                ANCOSUR para recibir
                información sobre la
                evaluación de mi terreno.
              </span>
            </label>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {message && (
              <div className={styles.success}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
            >
              {isSending
                ? "Enviando..."
                : "Enviar información"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}