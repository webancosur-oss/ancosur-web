import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  locationNeoEterna,
  whatsappNeoEterna,
} from "../data";
import styles from "./NeoEternaLocation.module.css";

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  locationNeoEterna.googleMapsQuery
)}&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationNeoEterna.googleMapsQuery
)}`;

export default function NeoEternaLocation() {
  return (
    <section
      className={styles.section}
      id="ubicacion-neo-eterna"
      aria-labelledby="neo-eterna-location-title"
    >
      <div className={styles.header}>
        <span>Ubicación</span>

        <h2 id="neo-eterna-location-title">
          Tu futuro hogar te espera en NEO ETERNA
        </h2>

        <p>
          Vive e invierte en una ubicación estratégica de San Carlos, cerca de
          las principales universidades, comercios y servicios de Huancayo.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title="Ubicación del proyecto Neo Eterna en Huancayo"
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
                  {locationNeoEterna.projectAddress}
                </strong>

                <p>
                  {locationNeoEterna.projectReference}
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

            <h3>Conoce Neo Eterna</h3>

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
              value="ubicacion-neo-eterna"
            />

            <input
              type="hidden"
              name="project"
              value="Neo Eterna"
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
                comercial sobre Neo Eterna.
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
            href={whatsappNeoEterna}
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
                {locationNeoEterna.officeAddress}
              </strong>

              <p>
                {locationNeoEterna.schedule}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}