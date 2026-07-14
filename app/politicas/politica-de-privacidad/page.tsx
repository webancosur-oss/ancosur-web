import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import styles from "./PoliticasPrivacidadPage.module.css";

export const metadata = {
  title: "Política de Privacidad | ANCOSUR Inmobiliaria",
  description:
    "Conoce la Política de Privacidad y Tratamiento de Datos Personales de ANCOSUR S.A.C.",
};

const commercialPurposes = [
  "Gestionar clientes y prospectos interesados en proyectos inmobiliarios como lotes, departamentos y casas de campo.",
  "Enviar publicidad, promociones, invitaciones a eventos y lanzamientos de nuevos proyectos inmobiliarios.",
  "Realizar acciones de perfilamiento comercial para ofrecer productos acordes a la capacidad de inversión del usuario.",
  "Realizar análisis estadísticos e históricos relacionados con las ventas y comportamiento comercial.",
];

const riskEntities = [
  "SBS.",
  "Equifax / Infocorp.",
  "Experian / Sentinel.",
  "CEPIRS autorizadas.",
];

const dataTransfers = [
  "Centrales de riesgo autorizadas.",
  "Entidades financieras y bancarias cuando el usuario solicite financiamiento.",
  "Empresas pertenecientes al Grupo Económico de LA INMOBILIARIA.",
  "Proveedores de servicios tecnológicos que actúen como encargados del tratamiento bajo obligaciones de confidencialidad y seguridad.",
];

export default function PoliticasPrivacidadPage() {
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
            <h1>Política de Privacidad y Tratamiento de Datos Personales</h1>
            <p>
              Información sobre la recopilación, uso, protección y tratamiento
              de datos personales en ANCOSUR S.A.C.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <article className={styles.article}>
            <div className={styles.badge}>ANCOSUR S.A.C.</div>

            <section className={styles.block}>
              <h2>1. Identidad y domicilio del titular</h2>
              <p>
                La presente Política de Privacidad establece los términos en que{" "}
                <strong>ANCOSUR S.A.C.</strong>, en adelante{" "}
                <strong>LA INMOBILIARIA</strong>, identificada con RUC N.°{" "}
                <strong>20601146682</strong> y domicilio fiscal en Av. San
                Carlos N.° 1481, recopila, utiliza y protege la información
                personal proporcionada por sus usuarios y clientes a través de
                su sitio web, formularios físicos o digitales, redes sociales y
                demás canales de atención.
              </p>
            </section>

            <section className={styles.block}>
              <h2>2. Marco legal</h2>
              <p>
                La presente política se rige por la legislación peruana,
                especialmente por la <strong>Ley N.° 29733</strong> – Ley de
                Protección de Datos Personales y su Reglamento aprobado mediante
                el Decreto Supremo N.° 016-2024-JUS.
              </p>
            </section>

            <section className={styles.block}>
              <h2>3. Finalidades del tratamiento</h2>
              <p>
                Al aceptar esta política, el usuario otorga su consentimiento
                libre, previo, expreso, inequívoco e informado para que LA
                INMOBILIARIA trate sus datos personales con las siguientes
                finalidades:
              </p>

              <div className={styles.subBlock}>
                <h3>3.1 Finalidades comerciales</h3>

                <ul className={styles.list}>
                  {commercialPurposes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.subBlock}>
                <h3>3.2 Evaluación crediticia y de solvencia</h3>

                <p>
                  LA INMOBILIARIA podrá consultar, verificar y tratar la
                  información crediticia, financiera y de riesgo del usuario en
                  las centrales de riesgo públicas y privadas, tales como:
                </p>

                <ul className={styles.list}>
                  {riskEntities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p>
                  Esta información será utilizada únicamente para evaluar la
                  capacidad de pago y solvencia económica del usuario en
                  procesos de adquisición o financiamiento de bienes inmuebles,
                  así como para cumplir con las obligaciones legales
                  relacionadas con la prevención del lavado de activos y
                  financiamiento del terrorismo.
                </p>
              </div>
            </section>

            <section className={styles.block}>
              <h2>4. Banco de datos y plazo de conservación</h2>

              <p>
                La información será almacenada en el Banco de Datos Personales
                denominado <strong>CLIENTES Y PROSPECTOS</strong>, de
                titularidad de LA INMOBILIARIA.
              </p>

              <p>
                Los datos serán conservados únicamente durante el tiempo
                necesario para cumplir las finalidades descritas, las
                obligaciones legales, tributarias, contractuales y de prevención
                del lavado de activos, o hasta que el usuario revoque su
                consentimiento.
              </p>

              <p>
                Finalizado dicho periodo, la información será cancelada,
                eliminada o anonimizada conforme a la legislación vigente.
              </p>
            </section>

            <section className={styles.block}>
              <h2>5. Comunicación y transferencia de datos</h2>

              <p>
                LA INMOBILIARIA podrá comunicar o transferir los datos
                personales únicamente para las finalidades descritas en esta
                política a:
              </p>

              <ul className={styles.list}>
                {dataTransfers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                Los datos personales no serán vendidos ni cedidos a terceros no
                autorizados, salvo requerimiento de autoridad competente conforme
                a la legislación vigente.
              </p>
            </section>

            <section className={styles.block}>
              <h2>6. Ejercicio de derechos ARCO</h2>

              <p>
                El usuario podrá ejercer sus derechos de acceso, rectificación,
                cancelación y oposición, así como revocar el consentimiento
                otorgado en cualquier momento enviando una solicitud simple al
                correo electrónico:
              </p>

              <div className={styles.contactBox}>
                <span>Correo electrónico</span>
                <a href="mailto:jefe.experiencia.cliente@ancosur.com">jefe.experiencia.cliente@ancosur.com</a>
              </div>

              <p>
                Indicando como asunto: <strong>DERECHOS ARCO</strong>.
              </p>

              <p>
                La solicitud deberá adjuntar copia de su Documento Nacional de
                Identidad (DNI). La revocación del consentimiento para fines
                comerciales no afectará el tratamiento necesario para el
                cumplimiento de obligaciones legales ni las operaciones
                previamente iniciadas.
              </p>
            </section>

            <section className={styles.block}>
              <h2>7. Seguridad de la información</h2>

              <p>
                LA INMOBILIARIA implementa medidas técnicas, organizativas y
                legales apropiadas para garantizar la seguridad, integridad y
                confidencialidad de los datos personales, evitando su pérdida,
                alteración, acceso, tratamiento o divulgación no autorizada.
              </p>
            </section>
          </article>
        </section>
      </main>

      
    </>
  );
}