import {
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  brochureNeoEmperatriz,
  details,
  facts,
} from "../data";
import styles from "../NeoEmperatrizPage.module.css";

export default function NeoEmperatrizOverviewSection() {
  return (
    <section
      className={styles.overviewSection}
      id="informacion-neo-emperatriz"
      aria-labelledby="neo-emperatriz-overview-title"
    >
      <div className={styles.overviewInner}>
        <div className={styles.overviewContent}>
          <span className={styles.eyebrow}>
            Entrega inmediata
          </span>

          <h2 id="neo-emperatriz-overview-title">
            Tu nuevo hogar listo para habitar en San Carlos
          </h2>

          <p className={styles.overviewDescription}>
            Neo Emperatriz combina arquitectura moderna, naturaleza y
            elegancia en una ubicación estratégica de San Carlos, cerca de la
            Universidad Continental. Cuenta con departamentos familiares,
            ambientes amplios y áreas comunes diseñadas para disfrutar una
            vida más cómoda.
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
              href={brochureNeoEmperatriz}
              download
              aria-label="Descargar brochure de Neo Emperatriz"
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
            value="neo-emperatriz-page"
          />

          <input
            type="hidden"
            name="project"
            value="Neo Emperatriz"
          />

          <div className={styles.formHeader}>
            <span>Solicita información</span>

            <strong>
              Conoce los últimos departamentos disponibles
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

              <option value="Neo Emperatriz - 2 dormitorios">
                Departamento de 2 dormitorios
              </option>

              <option value="Neo Emperatriz - 3 dormitorios">
                Departamento de 3 dormitorios
              </option>

              <option value="Neo Emperatriz - Entrega inmediata">
                Departamento con entrega inmediata
              </option>

              <option value="Neo Emperatriz - Inversión">
                Comprar para inversión
              </option>

              <option value="Neo Emperatriz - Asesoría personalizada">
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
              Acepto ser contactado por ANCOSUR para recibir información
              comercial sobre Neo Emperatriz.
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