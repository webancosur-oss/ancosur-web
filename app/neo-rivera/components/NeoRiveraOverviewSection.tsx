import { ArrowRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { brochureNeoRivera, details, facts } from "../data";
import styles from "../NeoRiveraPage.module.css";

export default function NeoRiveraOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-neo-rivera"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>Vive en bienestar</span>

          <h2>El primer edificio wellness de Huancayo</h2>

          <p className={styles.overviewDescription}>
            Neo Rivera combina diseño moderno, baja densidad residencial,
            iluminación natural y espacios creados para disfrutar una vida más
            tranquila en La Ribera.
          </p>

          <div className={styles.overviewFacts}>
            {facts.map((item) => (
              <div key={item.label} className={styles.overviewFact}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
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
            <a href={brochureNeoRivera} download>
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
          <input type="hidden" name="source" value="neo-rivera-page" />
          <input type="hidden" name="project" value="Neo Rivera" />

          <div className={styles.formHeader}>
            <span>Solicita información</span>
            <strong>Quiero más información</strong>
            <p>
              Completa tus datos y un asesor se comunicará contigo.
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
            <select name="interest" required defaultValue="">
              <option value="" disabled>
                Selecciona una opción
              </option>

              <option value="Neo Rivera - Tipo Luz">
                Tipo Luz
              </option>

              <option value="Neo Rivera - Tipo Equilibrio">
                Tipo Equilibrio
              </option>

              <option value="Neo Rivera - Asesoría personalizada">
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
            <input type="checkbox" name="consent" required />

            <span>
              Acepto ser contactado por ANCOSUR para recibir información
              comercial sobre sus proyectos inmobiliarios.
            </span>
          </label>

          <button type="submit">
            Enviar datos
            <ArrowRightIcon size={18} weight="bold" aria-hidden={true} />
          </button>
        </form>
      </div>
    </section>
  );
}