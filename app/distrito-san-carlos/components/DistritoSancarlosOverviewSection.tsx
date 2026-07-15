import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  brochureDistritoSanCarlos,
  details,
  facts,
} from "../data";
import styles from "../DistritoSanCarlosPage.module.css";

export default function DistritoSanCarlosOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-distrito-san-carlos"
      aria-labelledby="distrito-san-carlos-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Ciudad de 15 minutos
          </span>

          <h2 id="distrito-san-carlos-overview-title">
            Una ciudad dentro de tu edificio
          </h2>

          <p className={styles.overviewDescription}>
            Distrito San Carlos integra departamentos, áreas comunes, espacios
            comerciales y servicios para que puedas vivir, trabajar, comprar y
            disfrutar sin alejarte de tu hogar.
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
            <a href={brochureDistritoSanCarlos} download>
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
            value="distrito-san-carlos-page"
          />

          <input
            type="hidden"
            name="project"
            value="Distrito San Carlos"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Conoce Distrito San Carlos
            </strong>

            <p>
              Completa tus datos y un asesor te brindará información sobre
              precios, disponibilidad, tipologías y formas de pago.
            </p>
          </div>

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

              <option value="Distrito San Carlos - Tipo Impulso">
                Tipo Impulso
              </option>

              <option value="Distrito San Carlos - Tipo Equilibrio">
                Tipo Equilibrio
              </option>

              <option value="Distrito San Carlos - Tipo Espacio">
                Tipo Espacio
              </option>

              <option value="Distrito San Carlos - Triplex">
                Triplex
              </option>

              <option value="Distrito San Carlos - Penthouse">
                Penthouse
              </option>

              <option value="Distrito San Carlos - Asesoría personalizada">
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
              comercial sobre Distrito San Carlos.
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