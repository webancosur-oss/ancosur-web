import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  locationNeoBalto,
  whatsappNeoBalto,
} from "../data";
import styles from "./NeoBaltoLocation.module.css";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationNeoBalto.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationNeoBalto.googleMapsQuery
)}`;

export default function NeoBaltoLocation() {
  return (
    <section
      className={styles.section}
      id="ubicacion-neo-balto"
      aria-labelledby="neo-balto-location-title"
    >
      <div className={styles.header}>
        <span>Ubicación</span>

        <h2 id="neo-balto-location-title">
          Tu futuro hogar te espera en NEO BALTO
        </h2>

        <p>
          Vive junto a tu mascota en una zona residencial de Huancayo, cerca
          del parque Allqu Park y conectada con comercios, servicios y las
          principales vías de la ciudad.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title="Ubicación de Neo Balto en Jr. San Agustín 416, San Antonio"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={styles.locationInfo}>
            <div className={styles.locationMain}>
              <div className={styles.locationIcon}>
                <MapPinIcon
                  size={22}
                  weight="fill"
                  aria-hidden={true}
                />
              </div>

              <div>
                <span>Ubicación del proyecto</span>

                <strong>
                  {locationNeoBalto.projectAddress}
                </strong>

                <p>
                  {locationNeoBalto.projectReference}
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
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
        </div>

        <aside className={styles.contactCard}>
          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <h3>Conoce Neo Balto</h3>

            <p>
              Déjanos tus datos y un asesor te brindará información sobre
              precios, tipologías, disponibilidad y formas de pago.
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
              value="ubicacion-neo-balto"
            />

            <input
              type="hidden"
              name="project"
              value="Neo Balto"
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

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="consent"
                required
              />

              <span>
                Acepto ser contactado por ANCOSUR para recibir información
                comercial sobre Neo Balto.
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
            href={whatsappNeoBalto}
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

          <div className={styles.schedule}>
            <ClockIcon
              size={19}
              weight="fill"
              aria-hidden={true}
            />

            <div>
              <span>Oficina de ventas</span>

              <strong>
                {locationNeoBalto.officeAddress}
              </strong>

              <p>
                {locationNeoBalto.schedule}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}