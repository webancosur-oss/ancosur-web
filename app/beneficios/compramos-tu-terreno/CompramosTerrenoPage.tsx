"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import styles from "./CompramosTerrenoPage.module.css";

type TerrainLeadResponse = {
  message?: string;
};

/**
 * Convierte valores como:
 * 150000
 * 150000.50
 * 150000,50
 * 150.000,50
 * 150,000.50
 */
const parseDecimalValue = (
  input: FormDataEntryValue | null
): number | null => {
  const rawValue = String(
    input ?? ""
  )
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "");

  if (!rawValue) {
    return null;
  }

  const lastComma =
    rawValue.lastIndexOf(",");

  const lastDot =
    rawValue.lastIndexOf(".");

  let normalizedValue =
    rawValue;

  if (
    lastComma !== -1 &&
    lastDot !== -1
  ) {
    /*
     * El último separador encontrado se interpreta
     * como separador decimal.
     */
    if (lastComma > lastDot) {
      normalizedValue =
        rawValue
          .replace(/\./g, "")
          .replace(",", ".");
    } else {
      normalizedValue =
        rawValue.replace(/,/g, "");
    }
  } else if (lastComma !== -1) {
    normalizedValue =
      rawValue.replace(",", ".");
  }

  const parsedValue =
    Number(normalizedValue);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : Number.NaN;
};

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

    setError("");
    setMessage("");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData =
      new FormData(form);

    const fullName =
      String(
        formData.get("fullName") ??
          ""
      ).trim();

    const phone =
      String(
        formData.get("phone") ??
          ""
      ).replace(/\D/g, "");

    const email =
      String(
        formData.get("email") ??
          ""
      )
        .trim()
        .toLowerCase();

    const location =
      String(
        formData.get("location") ??
          ""
      ).trim();

    const district =
      String(
        formData.get("district") ??
          ""
      ).trim();

    const reference =
      String(
        formData.get("reference") ??
          ""
      ).trim();

    const registryNumber =
      String(
        formData.get(
          "registryNumber"
        ) ?? ""
      ).trim();

    const currencyRaw =
      String(
        formData.get("currency") ??
          ""
      );

    const price =
      parseDecimalValue(
        formData.get("price")
      );

    const areaM2 =
      parseDecimalValue(
        formData.get("areaM2")
      );

    const additionalMessage =
      String(
        formData.get("message") ??
          ""
      ).trim();

    const consent =
      formData.get("consent") ===
      "accepted";

    if (fullName.length < 3) {
      setError(
        "Ingresa tus nombres y apellidos."
      );
      return;
    }

    if (!/^9\d{8}$/.test(phone)) {
      setError(
        "El celular debe tener 9 números y comenzar con 9."
      );
      return;
    }

    if (!email) {
      setError(
        "Ingresa un correo electrónico válido."
      );
      return;
    }

    if (!location) {
      setError(
        "Ingresa la ubicación del terreno."
      );
      return;
    }

    if (!district) {
      setError(
        "Ingresa el distrito donde se encuentra el terreno."
      );
      return;
    }

    if (
      currencyRaw !== "1" &&
      currencyRaw !== "2"
    ) {
      setError(
        "Selecciona la moneda del precio referencial."
      );
      return;
    }

    if (
      price !== null &&
      (!Number.isFinite(price) ||
        price <= 0)
    ) {
      setError(
        "Ingresa un precio referencial válido y mayor a 0."
      );
      return;
    }

    if (
      areaM2 === null ||
      !Number.isFinite(areaM2) ||
      areaM2 <= 0
    ) {
      setError(
        "Ingresa un área válida mayor a 0 m²."
      );
      return;
    }

    if (!consent) {
      setError(
        "Debes aceptar los términos y la política de privacidad."
      );
      return;
    }

    const terrainData = {
      fullName,
      phone,
      email,
      location,
      district,
      reference,
      registryNumber,

      currency:
        Number(currencyRaw),

      price,
      areaM2,

      message:
        additionalMessage,

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

      let result:
        TerrainLeadResponse;

      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        result =
          (await response.json()) as TerrainLeadResponse;
      } else {
        result = {
          message:
            await response.text(),
        };
      }

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
        <section
          className={styles.hero}
        >
          <div
            className={
              styles.heroContent
            }
          >
            <span>
              COMPRAMOS TU TERRENO
            </span>

            <h1>
              Hacemos historia en tu
              propiedad
            </h1>

            <p>
              Buscamos terrenos con
              potencial para desarrollar
              nuevos proyectos
              inmobiliarios. Cuéntanos
              sobre tu propiedad y
              evaluaremos tu propuesta.
            </p>
          </div>
        </section>

        <section
          className={
            styles.formSection
          }
        >
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div
              className={styles.header}
            >
              <span>
                PRESENTA TU PROPIEDAD
              </span>

              <h2>
                Cuéntanos sobre tu
                terreno
              </h2>

              <p>
                Completa el formulario y
                nuestro equipo se pondrá
                en contacto contigo.
              </p>
            </div>

            <div
              className={
                styles.formGrid
              }
            >
              <input
                type="text"
                name="fullName"
                placeholder="Nombres y apellidos"
                autoComplete="name"
                minLength={3}
                maxLength={100}
                required
                disabled={isSending}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Celular — 9 números"
                autoComplete="tel"
                inputMode="numeric"
                pattern="9[0-9]{8}"
                maxLength={9}
                required
                disabled={isSending}
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(0, 9);
                }}
              />

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                autoComplete="email"
                maxLength={150}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="location"
                placeholder="Dirección o ubicación del terreno"
                autoComplete="street-address"
                maxLength={150}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="district"
                placeholder="Distrito"
                autoComplete="address-level2"
                maxLength={100}
                required
                disabled={isSending}
              />

              <input
                type="text"
                name="reference"
                placeholder="Referencia de ubicación — opcional"
                maxLength={180}
                disabled={isSending}
              />

              <input
                type="text"
                name="registryNumber"
                placeholder="N.° de partida registral — opcional"
                maxLength={80}
                disabled={isSending}
              />

              <select
                name="currency"
                defaultValue=""
                required
                disabled={isSending}
                aria-label="Moneda del precio referencial"
              >
                <option
                  value=""
                  disabled
                >
                  Selecciona la moneda
                </option>

                <option value="1">
                  Soles (S/)
                </option>

                <option value="2">
                  Dólares (US$)
                </option>
              </select>

              {/*
                Se utiliza text + inputMode decimal
                para evitar las flechas tipo contador.
              */}
              <input
                type="text"
                name="price"
                placeholder="Precio referencial — opcional"
                inputMode="decimal"
                autoComplete="off"
                maxLength={20}
                disabled={isSending}
                aria-label="Precio referencial del terreno"
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(
                        /[^\d.,]/g,
                        ""
                      )
                      .slice(0, 20);
                }}
              />

              <input
                type="text"
                name="areaM2"
                placeholder="Área total en m²"
                inputMode="decimal"
                autoComplete="off"
                maxLength={15}
                required
                disabled={isSending}
                aria-label="Área total del terreno en metros cuadrados"
                onInput={(event) => {
                  event.currentTarget.value =
                    event.currentTarget.value
                      .replace(
                        /[^\d.,]/g,
                        ""
                      )
                      .slice(0, 15);
                }}
              />
            </div>

            <textarea
              name="message"
              placeholder="Información adicional sobre el terreno — opcional"
              rows={5}
              maxLength={500}
              disabled={isSending}
            />

            <label
              className={
                styles.checkbox
              }
            >
              <input
                type="checkbox"
                name="consent"
                value="accepted"
                defaultChecked
                required
                disabled={isSending}
              />

              <span>
                Acepto los{" "}
                <Link
                  href="/politicas/politica-de-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    styles.termsLink
                  }
                >
                  términos y la política
                  de privacidad
                </Link>{" "}
                y autorizo a Ancosur a
                contactarme para brindar
                información sobre la
                evaluación de mi terreno.
              </span>
            </label>

            {error && (
              <div
                className={styles.error}
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                className={
                  styles.success
                }
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
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