import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  brochureCaminoReal,
  details,
  facts,
  projectDescription,
  projectFormData,
} from "../data";

import styles from "./CaminoRealOverviewSection.module.css";

export default function CaminoRealOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-camino-real"
      aria-labelledby="camino-real-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            {projectDescription.eyebrow}
          </span>

          <h2 id="camino-real-overview-title">
            {projectDescription.title}
          </h2>

          <p className={styles.overviewDescription}>
            {projectDescription.introduction}
          </p>

          <div className={styles.overviewFacts}>
            {facts.map((item) => (
              <div
                key={item.label}
                className={styles.overviewFact}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className={styles.projectText}>
            {projectDescription.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}
          </div>

          <ul className={styles.detailsList}>
            {details.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.overviewActions}>
            <a
              href={brochureCaminoReal}
              download
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

          <label>
            Mensaje opcional

            <textarea
              name="message"
              placeholder="Cuéntanos qué lote buscas o cuándo deseas que te contactemos."
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
              Acepto ser contactado por ANCOSUR
              para recibir información comercial
              sobre Camino Real.
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