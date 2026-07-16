import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  brochureNeoEterna,
  details,
  facts,
} from "../data";
import styles from "../NeoEternaPage.module.css";

export default function NeoEternaOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-neo-eterna"
      aria-labelledby="neo-eterna-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Vive conectado
          </span>

          <h2 id="neo-eterna-overview-title">
            Vive cerca de todo en la zona universitaria de Huancayo
          </h2>

          <p className={styles.overviewDescription}>
            Neo Eterna es un proyecto pensado para estudiantes,
            profesionales, familias e inversionistas que buscan una
            ubicación estratégica en la avenida San Carlos. Cuenta con
            departamentos modernos de uno, dos y tres dormitorios, además
            de espacios comunes diseñados para disfrutar, compartir y
            vivir con mayor comodidad.
          </p>

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

          <ul className={styles.detailsList}>
            {details.map((item) => (
              <li key={`${item.label}-${item.value}`}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.overviewActions}>
            <a
              href={brochureNeoEterna}
              download
              aria-label="Descargar brochure de Neo Eterna"
            >
              <DownloadSimpleIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />

              Descargar brochure
            </a>

            <Link href="/portal-de-transparencia/neo-eterna">
              Respaldo legal

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
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
            value="neo-eterna-page"
          />

          <input
            type="hidden"
            name="project"
            value="Neo Eterna"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Conoce más sobre Neo Eterna
            </strong>

            <p>
              Completa tus datos y un asesor se comunicará contigo
              para brindarte información sobre precios,
              disponibilidad y formas de pago.
            </p>
          </div>

          <label>
            Nombre completo

            <input
              type="text"
              name="fullName"
              placeholder="Ej. Angela Huayra"
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
                title="Ingresa un número celular peruano de 9 dígitos que comience con 9."
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

              <option value="Neo Eterna - 1 dormitorio">
                Departamento de 1 dormitorio
              </option>

              <option value="Neo Eterna - 2 dormitorios">
                Departamento de 2 dormitorios
              </option>

              <option value="Neo Eterna - 3 dormitorios">
                Departamento de 3 dormitorios
              </option>

              <option value="Neo Eterna - Inversión">
                Comprar para inversión
              </option>

              <option value="Neo Eterna - Asesoría personalizada">
                Asesoría personalizada
              </option>
            </select>
          </label>

          <label>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué departamento buscas o en qué horario deseas que te contactemos."
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
              información comercial sobre Neo Eterna.
            </span>
          </label>

          <button type="submit">
            Solicitar información

            <ArrowRightIcon
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </button>
        </form>
      </div>
    </section>
  );
}