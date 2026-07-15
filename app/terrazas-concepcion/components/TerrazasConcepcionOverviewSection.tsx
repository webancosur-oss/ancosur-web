import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  brochureTerrazasConcepcion,
  details,
  facts,
  projectFormData,
} from "../data";

import styles from "./TerrazasConcepcionOverviewSection.module.css";

export default function TerrazasConcepcionOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-terrazas-concepcion"
      aria-labelledby="terrazas-concepcion-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Naturaleza, tranquilidad e inversión
          </span>

          <h2 id="terrazas-concepcion-overview-title">
            Construye tu futuro en Las Terrazas de Concepción
          </h2>

          <p className={styles.overviewDescription}>
            Un proyecto entregado con 57 lotes de 90 m² a 174 m²,
            rodeado de naturaleza y con vistas privilegiadas al Valle
            de Concepción. Encuentra terrenos desde S/ 33,900 con
            financiamiento directo y facilidades de pago.
          </p>

          <div className={styles.overviewFacts}>
            {facts.map((item) => (
              <article
                key={`${item.label}-${item.value}`}
                className={styles.overviewFact}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
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
              href={brochureTerrazasConcepcion}
              download
              aria-label="Descargar brochure de Las Terrazas de Concepción"
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
            value={projectFormData.source}
          />

          <input
            type="hidden"
            name="project"
            value={projectFormData.projectName}
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              {projectFormData.title}
            </strong>

            <p>
              {projectFormData.description}
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

              {projectFormData.interestOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué metraje buscas o cuándo deseas que te contactemos."
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
              información comercial sobre Las Terrazas de
              Concepción.
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