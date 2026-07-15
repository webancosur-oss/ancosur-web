import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { brochureNeoBalto, details, facts } from "../data";
import styles from "../NeoBaltoPage.module.css";

export default function NeoBaltoOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-neo-balto"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Vive en familia
          </span>

          <h2>
            El primer edificio Pet-Centric de Huancayo
          </h2>

          <p className={styles.overviewDescription}>
            Neo Balto es un proyecto diseñado para personas que consideran a
            sus mascotas parte de la familia. Combina departamentos modernos,
            acabados pet-friendly y espacios pensados para disfrutar una vida
            más cómoda, segura y práctica en San Antonio, Huancayo.
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
            <a href={brochureNeoBalto} download>
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
            value="neo-balto-page"
          />

          <input
            type="hidden"
            name="project"
            value="Neo Balto"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Conoce más sobre Neo Balto
            </strong>

            <p>
              Completa tus datos y un asesor se comunicará contigo para
              brindarte precios, disponibilidad y formas de pago.
            </p>
          </div>

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

          <div className={styles.formTwoColumns}>
            <label>
              Celular

              <input
                type="tel"
                name="phone"
                placeholder="987654321"
                inputMode="numeric"
                autoComplete="tel"
                pattern="[0-9]{9}"
                minLength={9}
                maxLength={9}
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
              />
            </label>
          </div>

          <label>
            Estoy interesado en

            <select
              name="interest"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una opción
              </option>

              <option value="Neo Balto - Tipo Impulso">
                Tipo Impulso
              </option>

              <option value="Neo Balto - Tipo Luz">
                Tipo Luz
              </option>

              <option value="Neo Balto - Asesoría personalizada">
                Asesoría personalizada
              </option>
            </select>
          </label>

          <label>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué departamento buscas o cuándo deseas que te contactemos."
              maxLength={250}
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

          <button type="submit">
            Enviar datos

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