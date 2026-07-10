import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import styles from "./CookiesPage.module.css";

export const metadata = {
  title: "Política de Cookies | ANCOSUR Inmobiliaria",
  description:
    "Conoce la Política de Cookies de ANCOSUR S.A.C. y cómo usamos cookies técnicas, de análisis y publicitarias.",
};

const cookieTypes = [
  {
    title: "Cookies técnicas",
    subtitle: "Esenciales",
    description:
      "Son necesarias para que la web funcione correctamente. Permiten la navegación y el uso de diferentes opciones o servicios, como llenar formularios o ver mapas interactivos.",
  },
  {
    title: "Cookies de análisis",
    subtitle: "Google Analytics",
    description:
      "Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico del uso del sitio web, con el fin de mejorar la experiencia de navegación.",
  },
  {
    title: "Cookies publicitarias y de comportamiento",
    subtitle: "Meta Pixel / Facebook",
    description:
      "Almacenan información del comportamiento de los usuarios obtenida a través de sus hábitos de navegación. Esto permite desarrollar perfiles para mostrar publicidad relevante en Facebook e Instagram.",
  },
];

const browsers = ["Chrome", "Explorer / Edge", "Firefox", "Safari"];

export default function CookiesPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <BackButton
              href="/politicas"
              label="Volver a políticas"
              variant="dark"
              className={styles.backButton}
            />

            <span className={styles.eyebrow}>Políticas ANCOSUR</span>
            <h1>Política de Cookies</h1>
            <p>
              Información sobre el uso de cookies en nuestro sitio web y cómo
              puedes gestionarlas desde tu navegador.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <article className={styles.article}>
            <div className={styles.badge}>ANCOSUR S.A.C.</div>

            <section className={styles.block}>
              <h2>1. ¿Qué son las cookies?</h2>
              <p>
                Una cookie es un pequeño archivo de texto que se almacena en su
                navegador cuando visita nuestro sitio web{" "}
                <strong>www.ancosur.com</strong>.
              </p>

              <p>
                Estos archivos permiten que la web recuerde información sobre su
                visita, como su idioma preferido y otras opciones, lo que
                facilita su próxima visita y hace que el sitio le resulte más
                útil.
              </p>

              <p>
                Las cookies no dañan su computadora ni contienen virus.
              </p>
            </section>

            <section className={styles.block}>
              <h2>2. ¿Qué tipos de cookies utilizamos?</h2>

              <p>
                En este sitio web gestionado por{" "}
                <strong>ANCOSUR S.A.C.</strong>, utilizamos cookies propias y de
                terceros con las siguientes finalidades:
              </p>

              <div className={styles.cookieGrid}>
                {cookieTypes.map((cookie) => (
                  <div key={cookie.title} className={styles.cookieCard}>
                    <span>{cookie.subtitle}</span>
                    <h3>{cookie.title}</h3>
                    <p>{cookie.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.block}>
              <h2>3. Consentimiento</h2>

              <p>
                Al navegar y continuar en nuestro sitio web, el usuario estará
                consintiendo el uso de las cookies antes enunciadas, por los
                plazos señalados y en las condiciones contenidas en la presente
                Política de Cookies.
              </p>
            </section>

            <section className={styles.block}>
              <h2>4. ¿Cómo desactivar las cookies?</h2>

              <p>
                El usuario puede permitir, bloquear o eliminar las cookies
                instaladas en su equipo mediante la configuración de las opciones
                del navegador instalado en su ordenador.
              </p>

              <ul className={styles.list}>
                {browsers.map((browser) => (
                  <li key={browser}>{browser}</li>
                ))}
              </ul>

              <div className={styles.note}>
                <h3>Importante</h3>
                <p>
                  Si deshabilita las cookies técnicas, es posible que algunas
                  funcionalidades de nuestro sitio web, como formularios de
                  contacto o mapas, no funcionen correctamente.
                </p>
              </div>
            </section>

            <section className={styles.block}>
              <h2>5. Actualizaciones y cambios</h2>

              <p>
                ANCOSUR S.A.C. puede modificar esta Política de Cookies en
                función de exigencias legislativas, reglamentarias, o con la
                finalidad de adaptar dicha política a las instrucciones de la
                Autoridad Nacional de Protección de Datos Personales.
              </p>
            </section>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}