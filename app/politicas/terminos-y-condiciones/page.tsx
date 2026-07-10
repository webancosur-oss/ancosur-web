import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import styles from "./TerminosPage.module.css";

export const metadata = {
  title: "Términos y Condiciones | ANCOSUR Inmobiliaria",
  description:
    "Consulta los términos y condiciones de uso del sitio web de ANCOSUR S.A.C.",
};

const intellectualProperty = [
  "Logotipos de Ancosur, Zagari Resort Club y Línea Neo.",
  "Textos, fotografías, videos, planos y diseños.",
  "Contenido gráfico, audiovisual y comercial publicado en el sitio web.",
];

const renderNotes = [
  "Las imágenes, planos 3D, recorridos virtuales y representaciones gráficas son referenciales.",
  "Los acabados, texturas, colores, áreas verdes y mobiliario pueden variar respecto al producto final.",
  "El entorno urbano o paisajístico es una aproximación artística y podría sufrir modificaciones futuras ajenas a la inmobiliaria.",
];

const dataConsentPurposes = [
  "Enviarle publicidad de los distintos proyectos de LA EMPRESA.",
  "Perfilar a los clientes y desarrollar estrategias comerciales y de marketing.",
  "Transferir su información a las distintas unidades de negocio del Grupo Económico de LA EMPRESA.",
];

export default function TerminosPage() {
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
            <h1>Términos y Condiciones de Uso</h1>
            <p>
              Condiciones generales para el acceso, navegación y uso del sitio
              web de ANCOSUR S.A.C.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <article className={styles.article}>
            <div className={styles.badge}>ANCOSUR S.A.C.</div>

            <section className={styles.block}>
              <h2>1. Datos generales</h2>
              <p>
                El presente sitio web es propiedad de{" "}
                <strong>ANCOSUR S.A.C.</strong>, con RUC N.°{" "}
                <strong>20601146682</strong>, con domicilio legal en Av. San
                Carlos N.° 1481, Huancayo, Perú.
              </p>
              <p>
                El acceso y uso de este sitio web implica la aceptación plena de
                las condiciones aquí expuestas.
              </p>
            </section>

            <section className={styles.block}>
              <h2>2. Propiedad intelectual</h2>
              <p>
                Todo el contenido mostrado en este portal está protegido por la
                legislación de Derechos de Autor y Propiedad Industrial.
              </p>

              <ul className={styles.list}>
                {intellectualProperty.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                Queda prohibida su reproducción total o parcial sin autorización
                escrita de la empresa.
              </p>
            </section>

            <section className={styles.block}>
              <h2>3. Precios y cotizaciones</h2>
              <p>
                Los precios mostrados en la web, brochures descargables o
                enviados por agentes virtuales son referenciales y están sujetos
                a variación sin previo aviso hasta el momento de la firma del
                contrato de separación o compraventa.
              </p>

              <div className={styles.note}>
                <h3>Moneda</h3>
                <p>
                  Los precios expresados en Dólares Americanos, USD, se pagarán
                  al tipo de cambio venta vigente que establezca la empresa el
                  día de la transacción.
                </p>
              </div>
            </section>

            <section className={styles.block}>
              <h2>4. Descargo de responsabilidad sobre imágenes</h2>
              <p>
                Las imágenes, renders, planos 3D, recorridos virtuales y
                representaciones gráficas de los proyectos, lotes y edificios,
                son meramente ilustrativas y referenciales.
              </p>

              <ul className={styles.list}>
                {renderNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block}>
              <h2>5. Stock y disponibilidad</h2>
              <p>
                La información sobre la disponibilidad de unidades, lotes o
                departamentos, es dinámica.
              </p>
              <p>
                El usuario reconoce que una unidad mostrada como disponible en
                la web podría haber sido vendida en tiempo real en nuestra sala
                de ventas física.
              </p>
              <p>
                La única forma de asegurar una unidad es mediante la suscripción
                del contrato de separación y el pago correspondiente.
              </p>
            </section>

            <section className={styles.block}>
              <h2>6. Promociones y campañas</h2>
              <p>
                Toda campaña promocional, como Prime Days, bonos de descuento u
                otras acciones comerciales, se regirá por sus propios términos
                legales específicos.
              </p>
              <p>
                Dichos términos indicarán la vigencia y stock mínimo disponible,
                en cumplimiento con el Código de Protección y Defensa del
                Consumidor.
              </p>
            </section>

            <section className={styles.block}>
              <h2>7. Legislación aplicable</h2>
              <p>
                Cualquier controversia derivada del uso de este sitio web se
                someterá a la competencia de los Jueces y Tribunales de la
                ciudad de Huancayo y a las leyes de la República del Perú.
              </p>
            </section>

            <section className={styles.block}>
              <h2>8. Tratamiento de datos personales</h2>
              <p>
                En virtud a lo establecido en la Ley N.° 29733, Ley de
                Protección de Datos Personales, y el Decreto Supremo N.°
                003-2013-JUS, por el que se aprueba su Reglamento, EL(LA)
                INTERESADO(A) manifiesta expresamente su consentimiento para que
                sus datos personales sean incorporados en los bancos de datos de
                titularidad de la empresa <strong>ANCOSUR S.A.C.</strong>,
                almacenados en el domicilio de LA EMPRESA.
              </p>

              <p>El tratamiento de datos podrá realizarse para:</p>

              <ul className={styles.list}>
                {dataConsentPurposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                Asimismo, EL(LA) INTERESADO(A) declara conocer la Política de
                Privacidad de LA EMPRESA, que además se encuentra establecida en
                la web www.ancosur.com.
              </p>
            </section>

          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}