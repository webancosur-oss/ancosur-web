import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  locationDistritoSanCarlos,
  whatsappDistritoSanCarlos,
} from "../data";
import styles from "./DistritoSanCarlosLocation.module.css";

const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  locationDistritoSanCarlos.googleMapsQuery
)}&t=m&z=17&ie=UTF8&iwloc=near&output=embed`;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  locationDistritoSanCarlos.googleMapsQuery
)}`;

export default function DistritoSanCarlosLocation() {
  return (
    <section
      className={styles.section}
      id="ubicacion-distrito-san-carlos"
      aria-labelledby="distrito-san-carlos-location-title"
    >
      <div className={styles.header}>
        <span>Ubicación</span>

        <h2 id="distrito-san-carlos-location-title">
          Tu futuro hogar te espera en Distrito San Carlos
        </h2>

        <p>
          Vive conectado en una ubicación estratégica de Huancayo, cerca del
          Obelisco, Real Plaza, comercios, servicios y las principales vías de
          la ciudad.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mapCard}>
          <div className={styles.map}>
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title="Ubicación de Distrito San Carlos en Huancayo"
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
                  {locationDistritoSanCarlos.projectAddress}
                </strong>

                <p>
                  {locationDistritoSanCarlos.projectReference}
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
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

            <h3>Conoce Distrito San Carlos</h3>

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
              value="ubicacion-distrito-san-carlos"
            />

            <input
              type="hidden"
              name="project"
              value="Distrito San Carlos"
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
                comercial sobre Distrito San Carlos.
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
            href={whatsappDistritoSanCarlos}
            target="_blank"
            rel="noopener noreferrer"
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
                {locationDistritoSanCarlos.officeAddress}
              </strong>

              <p>
                {locationDistritoSanCarlos.schedule}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}