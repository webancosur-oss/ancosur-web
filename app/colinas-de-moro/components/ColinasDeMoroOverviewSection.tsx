import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  brochureColinasDeMoro,
  details,
  facts,
} from "../data";
import styles from "../components/ColinasDeMoroOverviewSection.module.css";

export default function ColinasDeMoroOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-colinas-de-moro"
      aria-labelledby="colinas-de-moro-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Invierte en tu patrimonio
          </span>

          <h2 id="colinas-de-moro-overview-title">
            Lotes con entrega inmediata en Concepción
          </h2>

          <p className={styles.overviewDescription}>
            Las Colinas de Moro es una oportunidad para construir tu
            vivienda, casa de campo o realizar una inversión en una zona
            conectada con la Carretera Central y con proyección de
            crecimiento.
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
              href={brochureColinasDeMoro}
              download
              aria-label="Descargar brochure de Las Colinas de Moro"
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
            value="colinas-de-moro-page"
          />

          <input
            type="hidden"
            name="project"
            value="Las Colinas de Moro"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Conoce nuestros lotes disponibles
            </strong>

            <p>
              Completa tus datos y un asesor te brindará información sobre
              precios, metrajes, disponibilidad y formas de pago.
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

              <option value="Colinas de Moro - Lote de 90 m²">
                Lote de 90 m²
              </option>

              <option value="Colinas de Moro - Lote de 131 m²">
                Lote de 131 m²
              </option>

              <option value="Colinas de Moro - Inversión">
                Comprar para inversión
              </option>

              <option value="Colinas de Moro - Asesoría">
                Asesoría personalizada
              </option>
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
              Acepto ser contactado por ANCOSUR para recibir información
              comercial sobre Las Colinas de Moro.
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