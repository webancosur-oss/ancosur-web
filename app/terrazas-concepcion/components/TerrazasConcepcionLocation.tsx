import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  MountainsIcon,
  SunIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  locationTerrazasConcepcion,
  projectFormData,
  whatsappTerrazasConcepcion,
} from "../data";

import styles from "./TerrazasConcepcionLocation.module.css";

export default function TerrazasConcepcionLocation() {
  const googleMapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    locationTerrazasConcepcion.googleMapsQuery
  )}&output=embed`;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationTerrazasConcepcion.googleMapsQuery
  )}`;

  const officeGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationTerrazasConcepcion.officeGoogleMapsQuery
  )}`;

  return (
    <section
      className={styles.section}
      id="ubicacion-terrazas-concepcion"
      aria-labelledby="terrazas-concepcion-location-title"
    >
      <div className={styles.header}>
        <span>{locationTerrazasConcepcion.eyebrow}</span>

        <h2 id="terrazas-concepcion-location-title">
          {locationTerrazasConcepcion.title}
        </h2>

        <p>{locationTerrazasConcepcion.description}</p>
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
            <span>
              {locationTerrazasConcepcion.altitude.label}
            </span>

            <strong>
              {locationTerrazasConcepcion.altitude.value}
            </strong>
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
            <span>
              {locationTerrazasConcepcion.climate.label}
            </span>

            <strong>
              {locationTerrazasConcepcion.climate.value}
            </strong>
          </div>
        </article>
      </div>

      <div className={styles.grid}>
        <article className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={googleMapsEmbed}
              title="Ubicación de Las Terrazas de Concepción"
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
                  {locationTerrazasConcepcion.projectAddress}
                </strong>

                <p>
                  {locationTerrazasConcepcion.projectReference}
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

        <aside
          className={styles.contactCard}
          id="informacion-terrazas-concepcion"
        >
          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <h3>{projectFormData.title}</h3>

            <p>{projectFormData.description}</p>
          </div>

          <form
            className={styles.form}
            action="/api/leads"
            method="post"
          >
            <input
              type="hidden"
              name="source"
              value={projectFormData.source}
            />

            <input
              type="hidden"
              name="project"
              value={projectFormData.projectName}
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
              ¿Qué información necesitas?

              <select
                name="interest"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>

                {projectFormData.interestOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                required
              />

              <span>
                Acepto ser contactado por ANCOSUR para recibir
                información comercial sobre Las Terrazas de
                Concepción.
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
            href={whatsappTerrazasConcepcion}
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
                  {locationTerrazasConcepcion.officeAddress}
                </strong>

                <a
                  href={officeGoogleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.officeLink}
                >
                  Ver ubicación
                  <ArrowRightIcon
                    size={14}
                    weight="bold"
                    aria-hidden={true}
                  />
                </a>
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
                  {locationTerrazasConcepcion.schedule}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}