import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { whatsappNeoRivera } from "../data";
import styles from "./NeoRiveraLocation.module.css";

const GOOGLE_MAPS_QUERY =
  "Jirón Las Dalias, La Ribera, Huancayo, Junín, Perú";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  GOOGLE_MAPS_QUERY
)}`;

export default function NeoRiveraLocation() {
  return (
    <section
      className={styles.section}
      id="ubicacion-neo-rivera"
      aria-labelledby="neo-rivera-location-title"
    >
      <div className={styles.header}>
        <span>Ubicación</span>

        <h2 id="neo-rivera-location-title">
          Tu futuro hogar te espera en La Ribera
        </h2>

        <p>
          Vive en una zona residencial tranquila, conectada con los principales
          servicios y puntos importantes de Huancayo.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title="Ubicación de Neo Rivera en Huancayo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={styles.locationInfo}>
            <div className={styles.locationMain}>
              <div className={styles.locationIcon}>
                <MapPinIcon size={22} weight="fill" aria-hidden={true} />
              </div>

              <div>
                <span>Ubicación del proyecto</span>
                <strong>La Ribera · Jr. Las Dalias</strong>
                <p>Al costado del Parque La Rivera, Huancayo.</p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className={styles.mapButton}
            >
              Abrir en Google Maps
              <ArrowRightIcon size={17} weight="bold" aria-hidden={true} />
            </a>
          </div>
        </div>

        <aside className={styles.contactCard}>
          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <h3>Conoce Neo Rivera</h3>

            <p>
              Déjanos tus datos y un asesor te brindará precios,
              disponibilidad y formas de pago.
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
              value="ubicacion-neo-rivera"
            />

            <input
              type="hidden"
              name="project"
              value="Neo Rivera"
            />

            <label>
              Nombre completo
              <input
                type="text"
                name="fullName"
                placeholder="Ej. Angela Huayra"
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
                comercial sobre Neo Rivera.
              </span>
            </label>

            <button type="submit" className={styles.submitButton}>
              Solicitar información
              <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
            </button>
          </form>

          <div className={styles.divider}>
            <span>o comunícate directamente</span>
          </div>

          <a
            href={whatsappNeoRivera}
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappButton}
          >
            <WhatsappLogoIcon size={20} weight="fill" aria-hidden={true} />
            Escribir por WhatsApp
          </a>

          <div className={styles.schedule}>
            <ClockIcon size={19} weight="fill" aria-hidden={true} />

            <div>
              <span>Horario de atención</span>
              <strong>Lunes a sábado, de 8:00 a. m. a 6:00 p. m.</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}