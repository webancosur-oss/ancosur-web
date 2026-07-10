import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./NeoRiveraPage.module.css";
import { neoRivera } from "@/data/neoRivera";

export const metadata = {
  title: "Neo Rivera | Departamentos Wellness en Huancayo",
  description:
    "Neo Rivera es un edificio wellness en La Ribera, Huancayo, con departamentos de 2 habitaciones, amenidades para el bienestar y áreas desde 57 m².",
};

const whatsappNeoRivera =
  "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20Neo%20Rivera";

const facts = [
  { label: "Concepto", value: "Edificio Wellness" },
  { label: "Ubicación", value: "La Ribera, Huancayo" },
  { label: "Tipología", value: "2 habitaciones" },
  { label: "Áreas", value: "Desde 57 m² hasta 67 m²" },
  { label: "Precio", value: "Desde S/ 211,270" },
  { label: "Privacidad", value: "2 departamentos por piso" },
];

const amenities = [
  {
    title: "Lobby Wellness",
    image: "/assets/projects/neorivera/amenities/lobby.webp",
    description:
      "Un ingreso moderno y acogedor que conecta con la esencia tranquila del proyecto.",
  },
  {
    title: "Wellness Gym",
    image: "/assets/projects/neorivera/amenities/gym.webp",
    description:
      "Espacio diseñado para mantener una rutina activa sin salir de casa.",
  },
  {
    title: "Wellness Terrace",
    image: "/assets/projects/neorivera/amenities/terrace.webp",
    description:
      "Una terraza para relajarte, compartir y disfrutar momentos al aire libre.",
  },
  {
    title: "Spa Eco Wash",
    image: "/assets/projects/neorivera/amenities/spa.webp",
    description:
      "Zona práctica pensada para el cuidado y bienestar de tus mascotas.",
  },
  {
    title: "Zona de Lectura",
    image: "/assets/projects/neorivera/amenities/lectura.webp",
    description:
      "Un ambiente tranquilo para desconectarte, leer o trabajar con calma.",
  },
];

const typologies = [
  {
    name: "Impulso",
    subtitle: "Tu primer gran paso",
    concept:
      "El empujón perfecto para independizarte o iniciar tu camino como inversionista.",
    target: "Jóvenes independientes y visionarios.",
    design:
      "Metraje smart. Compacto, funcional y sin espacios muertos.",
  },
  {
    name: "Equilibrio",
    subtitle: "Armonía entre vida y trabajo",
    concept:
      "El punto exacto donde conviven tu faceta familiar, laboral y personal.",
    target: "Familias jóvenes y profesionales home office.",
    design:
      "Versatilidad pura. Espacios que evolucionan contigo y tus hijos.",
  },
  {
    name: "Espacio",
    subtitle: "Conecta con los que amas",
    concept:
      "Diseñado para quienes saben que los mejores momentos se comparten en casa.",
    target: "Anfitriones por naturaleza y familias sociales.",
    design:
      "Balcones protagonistas. Amplitud visual para recibir y celebrar.",
  },
  {
    name: "Tiempo",
    subtitle: "Eficiencia en cada detalle",
    concept:
      "Tu hogar trabaja para ti. Practicidad máxima para rutinas aceleradas.",
    target: "Universitarios y profesionales dinámicos.",
    design:
      "Mantenimiento cero. Lavanderías compactas y closets modulares inteligentes.",
  },
  {
    name: "Luz",
    subtitle: "Energía que inspira",
    concept:
      "Amplitud sensorial. Un hogar que respira y potencia tu creatividad.",
    target: "Creativos, emprendedores y amantes del bienestar.",
    design:
      "Orientación solar estratégica. Acabados claros y minimalistas.",
  },
];

const floorPlans = [
  {
    name: "Luz",
    type: "2 Dorm",
    image: "/assets/projects/neorivera/plantas/luz-depa.webp",
    description:
      "Distribución funcional con espacios iluminados, pensada para vivir con comodidad y bienestar.",
  },
  {
    name: "Equilibrio",
    type: "2 Dorm",
    image: "/assets/projects/neorivera/plantas/equilibrio-depa.webp",
    description:
      "Ambientes versátiles que conectan la vida familiar, laboral y personal en un solo lugar.",
  },
];

const targetItems = [
  "Parejas jóvenes que buscan su primer departamento.",
  "Familias modernas que valoran la tranquilidad.",
  "Profesionales que desean vivir cerca de todo.",
  "Inversionistas que buscan plusvalía en Huancayo.",
];

const brochureNeoRivera = "/assets/projects/neorivera/brochure/brochure-neo-rivera.pdf";

const transparencyPortal = "/portal-de-transparencia";

export default function NeoRiveraPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>

            <span className={styles.eyebrow}>Lanzamiento</span>
            <h1>Neo Rivera</h1>
            <p>
              Vive en bienestar en La Ribera. Departamentos de 2 habitaciones en
              un edificio diseñado para quienes buscan tranquilidad, conexión y
              calidad de vida en Huancayo.
            </p>

            <div className={styles.heroActions}>
  <a
    href={whatsappNeoRivera}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.primaryButton}
  >
    Solicitar información
  </a>

  <a
    href={brochureNeoRivera}
    download
    className={styles.primaryButton}
  >
    Descargar brochure
  </a>

  <Link href={transparencyPortal} className={styles.outlineButton}>
    Portal de transparencia
  </Link>
</div>
          </div>

          {/* <div className={styles.heroImage}>
            <Image
              src="/assets/projects/rivera.webp"
              alt="Neo Rivera edificio wellness en Huancayo"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.image}
            />

            <div className={styles.priceBox}>
              <span>Desde</span>
              <strong>S/ 211,270</strong>
            </div>
          </div> */}
        </section>

        <section className={styles.factsSection}>
          <div className={styles.factsGrid}>
            {facts.map((item) => (
              <div key={item.label} className={styles.factCard}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.introText}>
            <span>Vive en bienestar</span>
            <h2>El primer edificio wellness de Huancayo</h2>
          </div>

          <div className={styles.introDescription}>
            <p>
              Neo Rivera redefine la forma de vivir en la ciudad. Su propuesta
              combina arquitectura moderna, baja densidad residencial,
              iluminación natural y espacios pensados para el bienestar diario.
            </p>

            <p>
              Ubicado en La Ribera, integra departamentos modernos de 2
              habitaciones con amenidades enfocadas en el equilibrio, la
              tranquilidad y la comodidad.
            </p>
          </div>
        </section>

        <section className={styles.conceptSection}>
          <div className={styles.conceptCard}>
            <span>Diseño que calma</span>
            <h2>Un hogar pensado para bajar el ritmo y vivir mejor</h2>
            <p>
              Neo Rivera ha sido diseñado para quienes quieren vivir en la
              ciudad sin renunciar a la tranquilidad. Su baja densidad, espacios
              funcionales y amenidades wellness permiten disfrutar una rutina
              más equilibrada, práctica y confortable.
            </p>
          </div>
        </section>

        <section className={styles.floorPlansSection}>
  <div className={styles.sectionHeader}>
    <span>Vistas en planta</span>
    <h2>¿Qué tipo de departamento buscas?</h2>
    <p>
      Conoce las distribuciones de Neo Rivera y elige el diseño que mejor se
      adapta a tu estilo de vida.
    </p>
  </div>

  <div className={styles.floorPlansGrid}>
    {floorPlans.map((plan) => (
      <article key={plan.name} className={styles.floorPlanCard}>
        <div className={styles.floorPlanTop}>{plan.type}</div>

        <div className={styles.floorPlanName}>{plan.name}</div>

        <div className={styles.floorPlanImage}>
          <Image
            src={plan.image}
            alt={`Vista en planta tipo ${plan.name} de Neo Rivera`}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.floorPlanContent}>
          <h3>Tipo {plan.name}</h3>
          <p>{plan.description}</p>
        </div>
      </article>
    ))}
  </div>
</section>

        <section className={styles.typologiesSection}>
            <div className={styles.sectionHeader}>
                <span>Tipologías ANCOSUR</span>
                <h2>¿Cuál es tu tipología ideal?</h2>
                <p>
                En ANCOSUR somos especialistas en entender cómo vives. Hemos creado 5
                tipologías únicas que se adaptan a tu rutina, tus metas y tu familia.
                </p>
            </div>

            <div className={styles.typologyGrid}>
                {typologies.map((item) => (
                <article key={item.name} className={styles.typologyCard}>
                    <span>Tipo</span>
                    <h3>{item.name}</h3>
                    <strong>{item.subtitle}</strong>

                    <div className={styles.typologyInfo}>
                    <p>
                        <b>El concepto:</b> {item.concept}
                    </p>

                    <p>
                        <b>Para quién:</b> {item.target}
                    </p>

                    <p>
                        <b>El diseño:</b> {item.design}
                    </p>
                    </div>
                </article>
                ))}
            </div>
            </section>

        <section id="amenidades" className={styles.amenitiesSection}>
          <div className={styles.sectionHeader}>
            <span>Amenidades</span>
            <h2>Espacios creados para tu bienestar diario</h2>
          </div>

          <div className={styles.amenitiesGrid}>
            {amenities.map((item, index) => (
                <article key={item.title} className={styles.amenityCard}>
                <div className={styles.amenityImage}>
                    <Image
                    src={item.image}
                    alt={`${item.title} de Neo Rivera`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 20vw"
                    className={styles.image}
                    />
                </div>

                <div className={styles.amenityContent}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
                </article>
            ))}
            </div>
        </section>

       <section className={styles.locationSection}>
        <div className={styles.locationContent}>
            <span>Ubicación</span>
            <h2>Vive conectado a un entorno más tranquilo</h2>
            <p>
            Neo Rivera se ubica en La Ribera, cerca al Parque La Rivera, en una zona
            residencial que permite vivir con mayor calma sin alejarte de la ciudad.
            </p>
        </div>

        <div className={styles.mapBox}>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.4940465272587!2d-75.22821831514196!3d-12.07781492404278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97ed95d6d829%3A0x5e7e406ed4e1de71!2sNeo%20Rivera!5e1!3m2!1ses-419!2spe!4v1783442365079!5m2!1ses-419!2spe"
            title="Ubicación de Neo Rivera en Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
        </section>

        <section className={styles.targetSection}>
          <div className={styles.sectionHeader}>
            <span>Ideal para</span>
            <h2>Bienestar e inversión en un solo lugar</h2>
          </div>

          <div className={styles.targetGrid}>
            {targetItems.map((item) => (
              <div key={item} className={styles.targetItem}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div>
            <span>Cotiza hoy</span>
            <h2>Tu futuro hogar te espera en Neo Rivera</h2>
            <p>
              Descubre precios, disponibilidad y formas de pago con un asesor
              inmobiliario.
            </p>
          </div>

          <a href={whatsappNeoRivera} target="_blank" rel="noopener noreferrer">
            Quiero información
          </a>
        </section>

        <section className={styles.officeSection}>
          <div className={styles.officeCard}>
            <span>Oficina de ventas</span>
            <h2>Visítanos y recibe asesoría personalizada</h2>

            <div className={styles.officeInfo}>
              <p>
                <strong>Dirección:</strong> Av. San Carlos 1481
              </p>
              <p>
                <strong>Horario:</strong> Lunes a sábado, 8:00 a.m. a 6:00 p.m.
              </p>
              <p>
                <strong>Teléfono:</strong> 971 069 763
              </p>
            </div>
          </div>
        </section>

        <p className={styles.disclaimer}>
          Todas las imágenes, planos, medidas y áreas son referenciales y pueden
          presentar modificaciones durante el desarrollo del proyecto.
        </p>
      </main>

      <Footer />
    </>
  );
}