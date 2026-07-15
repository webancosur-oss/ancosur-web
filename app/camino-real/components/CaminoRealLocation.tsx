import {
  ArrowRightIcon,
  BuildingsIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  locationCaminoReal,
  whatsappCaminoReal,
} from "../data";

import styles from "./CaminoRealLocation.module.css";

export default function CaminoRealLocation() {
  const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    locationCaminoReal.googleMapsQuery
  )}&output=embed`;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationCaminoReal.googleMapsQuery
  )}`;

  return (
    <section
      className={styles.section}
      id="ubicacion-camino-real"
      aria-labelledby="camino-real-location-title"
    >
      <div className={styles.header}>
        <span>{locationCaminoReal.eyebrow}</span>

        <h2 id="camino-real-location-title">
          {locationCaminoReal.title}
        </h2>

        <p>{locationCaminoReal.description}</p>
      </div>

      <div className={styles.locationFeatures}>
        <article>
          <div className={styles.featureIcon}>
            <ShieldCheckIcon
              size={25}
              weight="fill"
              aria-hidden={true}
            />
          </div>

          <div>
            <span>
              {locationCaminoReal.legalStatus.label}
            </span>

            <strong>
              {locationCaminoReal.legalStatus.value}
            </strong>
          </div>
        </article>

        <article>
          <div className={styles.featureIcon}>
            <BuildingsIcon
              size={25}
              weight="fill"
              aria-hidden={true}
            />
          </div>

          <div>
            <span>
              {locationCaminoReal.development.label}
            </span>

            <strong>
              {locationCaminoReal.development.value}
            </strong>
          </div>
        </article>
      </div>

      <div className={styles.grid}>
        <article className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={googleMapsEmbed}
              title="Ubicación de Camino Real Residencial en El Tambo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={styles.mapInformation}>
            <div className={styles.projectAddress}>
              <div className={styles.addressIcon}>
                <MapPinIcon
                  size={22}
                  weight="fill"
                  aria-hidden={true}
                />
              </div>

              <div>
                <span>Ubicación del proyecto</span>

                <strong>
                  {locationCaminoReal.projectAddress}
                </strong>

                <p>
                  {locationCaminoReal.projectReference}
                </p>
              </div>
            </div>

            <a
              href={googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className={styles.mapButton}
            >
              Abrir en Google Maps

              <ArrowRightIcon
                size={17}
                weight="bold"
                aria-hidden={true}
              />
            </a>
          </div>
        </article>

        <aside className={styles.contactCard}>
          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <h3>Encuentra el lote ideal para ti</h3>

            <p>
              Déjanos tus datos y un asesor te brindará información sobre
              disponibilidad, metrajes, precios y formas de pago.
            </p>
          </div>

          <form
            className={styles.form}
            action="/api/leads"
            method="post"
          >
            <input
              type="hidden"
              name="source"
              value="ubicacion-camino-real"
            />

            <input
              type="hidden"
              name="project"
              value="Camino Real"
            />

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
                minLength={3}
                maxLength={80}
                required
              />
            </label>

            <label>
              Número de celular

              <input
                type="tel"
                name="phone"
                placeholder="987654321"
                autoComplete="tel"
                inputMode="numeric"
                pattern="9[0-9]{8}"
                minLength={9}
                maxLength={9}
                title="Ingresa un celular peruano de 9 dígitos."
                required
              />
            </label>

            <label>
              Metraje de interés

              <select
                name="interest"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>

                <option value="camino-real-lote-desde-90">
                  Lote desde 90 m²
                </option>

                <option value="camino-real-lote-intermedio">
                  Lote de metraje intermedio
                </option>

                <option value="camino-real-lote-hasta-178">
                  Lote hasta 178 m²
                </option>

                <option value="camino-real-financiamiento">
                  Conocer formas de pago
                </option>

                <option value="camino-real-visita">
                  Agendar una visita
                </option>

                <option value="camino-real-asesoria">
                  Necesito asesoría personalizada
                </option>
              </select>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                value="accepted"
                required
              />

              <span>
                Acepto ser contactado por ANCOSUR para recibir información
                comercial sobre Camino Real.
              </span>
            </label>

            <button
              type="submit"
              className={styles.submitButton}
            >
              Solicitar información

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </button>
          </form>

          <div className={styles.divider}>
            <span>o comunícate directamente</span>
          </div>

          <a
            href={whatsappCaminoReal}
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappButton}
          >
            <WhatsappLogoIcon
              size={20}
              weight="fill"
              aria-hidden={true}
            />

            Escribir por WhatsApp
          </a>

          <div className={styles.officeInformation}>
            <div className={styles.officeItem}>
              <MapPinIcon
                size={19}
                weight="fill"
                aria-hidden={true}
              />

              <div>
                <span>Oficina de ventas</span>

                <strong>
                  {locationCaminoReal.officeAddress}
                </strong>
              </div>
            </div>

            <div className={styles.officeItem}>
              <ClockIcon
                size={19}
                weight="fill"
                aria-hidden={true}
              />

              <div>
                <span>Horario de atención</span>

                <strong>
                  {locationCaminoReal.schedule}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}