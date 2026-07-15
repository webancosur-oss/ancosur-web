import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  brochureNeoXport,
  details,
  facts,
} from "../data";

import styles from "../NeoXportPage.module.css";

export default function NeoXportOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-neo-xport"
      aria-labelledby="neo-xport-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Vive en movimiento
          </span>

          <h2 id="neo-xport-overview-title">
            El primer edificio con ADN deportivo de Huancayo
          </h2>

          <p className={styles.overviewDescription}>
            Neo Xport es un proyecto diseñado para personas que buscan
            un estilo de vida activo, dinámico y saludable. Vive frente
            al Polideportivo Wanka y disfruta departamentos modernos,
            áreas comunes especializadas y una ubicación conectada con
            los principales servicios de Huancayo.
          </p>

          {!!facts.length && (
            <div className={styles.overviewFacts}>
              {facts.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className={styles.overviewFact}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          )}

          {!!details.length && (
            <ul className={styles.detailsList}>
              {details.map((item) => (
                <li key={`${item.label}-${item.value}`}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.overviewActions}>
            <a
              href={brochureNeoXport}
              download
              aria-label="Descargar brochure de Neo Xport"
            >
              <DownloadSimpleIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />

              Descargar brochure
            </a>

            <Link href="/portal-de-transparencia">
              Respaldo legal

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden={true}
              />
            </Link>
          </div>
        </div>

        <form
          className={styles.overviewForm}
          action="/api/leads"
          method="post"
        >
          <input
            type="hidden"
            name="source"
            value="neo-xport-page"
          />

          <input
            type="hidden"
            name="project"
            value="Neo Xport"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Encuentra tu departamento ideal
            </strong>

            <p>
              Completa tus datos y un asesor te brindará información
              sobre precios, disponibilidad, tipologías y opciones de
              financiamiento.
            </p>
          </div>

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

          <div className={styles.formTwoColumns}>
            <label>
              Celular

              <input
                type="tel"
                name="phone"
                placeholder="987654321"
                inputMode="numeric"
                autoComplete="tel"
                pattern="9[0-9]{8}"
                minLength={9}
                maxLength={9}
                title="Ingresa un celular peruano de 9 dígitos."
                required
              />
            </label>

            <label>
              Correo opcional

              <input
                type="email"
                name="email"
                placeholder="correo@gmail.com"
                autoComplete="email"
                maxLength={120}
              />
            </label>
          </div>

          <label>
            Estoy interesado en

            <select
              name="interest"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Selecciona una opción
              </option>

              <option value="neo-xport-tipo-impulso">
                Tipo Impulso
              </option>

              <option value="neo-xport-tipo-luz">
                Tipo Luz
              </option>

              <option value="neo-xport-inversion">
                Comprar para inversión
              </option>

              <option value="neo-xport-financiamiento">
                Conocer opciones de financiamiento
              </option>

              <option value="neo-xport-visita">
                Agendar una visita
              </option>

              <option value="neo-xport-asesoria">
                Asesoría personalizada
              </option>
            </select>
          </label>

          <label>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
              rows={4}
              maxLength={250}
            />
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              required
            />

            <span>
              Acepto ser contactado por ANCOSUR para recibir
              información comercial sobre Neo Xport.
            </span>
          </label>

          <button type="submit">
            Solicitar información

            <ArrowRightIcon
              size={18}
              weight="bold"
              aria-hidden={true}
            />
          </button>
        </form>
      </div>
    </section>
  );
}