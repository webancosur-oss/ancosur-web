import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  MountainsIcon,
  SunIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  locationColinasDeMoro,
  whatsappColinasDeMoro,
} from "../data";

import styles from "./ColinasDeMoroLocation.module.css";

export default function ColinasDeMoroLocation() {
  const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}&output=embed`;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationColinasDeMoro.googleMapsQuery
  )}`;

  return (
    <section
      className={styles.section}
      id="ubicacion-colinas-de-moro"
      aria-labelledby="colinas-location-title"
    >
      <div className={styles.header}>
        <span>{locationColinasDeMoro.eyebrow}</span>

        <h2 id="colinas-location-title">
          {locationColinasDeMoro.title}
        </h2>

        <p>{locationColinasDeMoro.description}</p>
      </div>

      <div className={styles.locationFeatures}>
        <article>
          <div className={styles.featureIcon}>
            <MountainsIcon
              size={25}
              weight="fill"
              aria-hidden={true}
            />
          </div>

          <div>
            <span>{locationColinasDeMoro.altitude.label}</span>
            <strong>{locationColinasDeMoro.altitude.value}</strong>
          </div>
        </article>

        <article>
          <div className={styles.featureIcon}>
            <SunIcon
              size={25}
              weight="fill"
              aria-hidden={true}
            />
          </div>

          <div>
            <span>{locationColinasDeMoro.climate.label}</span>
            <strong>{locationColinasDeMoro.climate.value}</strong>
          </div>
        </article>
      </div>

      <div className={styles.grid}>
        <article className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={googleMapsEmbed}
              title="Ubicación de Las Colinas de Moro en Concepción"
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
                  {locationColinasDeMoro.projectAddress}
                </strong>

                <p>
                  {locationColinasDeMoro.projectReference}
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
              value="ubicacion-colinas-de-moro"
            />

            <input
              type="hidden"
              name="project"
              value="Las Colinas de Moro"
            />

            <label>
              Nombre completo

              <input
                type="text"
                name="fullName"
                placeholder="Ingresa tu nombre"
                autoComplete="name"
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
                pattern="[0-9]{9}"
                minLength={9}
                maxLength={9}
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

                <option value="lote-desde-90">
                  Lote desde 90 m²
                </option>

                <option value="lote-intermedio">
                  Lote de metraje intermedio
                </option>

                <option value="lote-hasta-285">
                  Lote hasta 285 m²
                </option>

                <option value="asesoria-personalizada">
                  Necesito asesoría personalizada
                </option>
              </select>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                required
              />

              <span>
                Acepto ser contactado por ANCOSUR para recibir información
                comercial sobre Las Colinas de Moro.
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
            href={whatsappColinasDeMoro}
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
                  {locationColinasDeMoro.officeAddress}
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
                  {locationColinasDeMoro.schedule}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}