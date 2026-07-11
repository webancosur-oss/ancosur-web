"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { benefits, type Benefit } from "@/data/benefits";
import styles from "./BeneficiosPage.module.css";

type ModalType = "referidos" | "club" | "terrenos";

type ModalInfo = {
  type: ModalType;
  eyebrow: string;
  title: string;
  description: string;
};

type ClubBenefit = {
  category: string;
  name: string;
  discount: string;
  image: string;
  description: string;
  terms: string;
  termsHref: string;
};

const clubBenefits: ClubBenefit[] = [
  {
    category: "Restaurantes",
    name: "Botánica",
    discount: "20%",
    image: "/assets/benefits/club/botanica.webp",
    description:"En toda la carta. Consumo presencial. Válido de lunes a domingo.",
        terms: "Aplican términos y condiciones según la marca aliada.",
    termsHref: "/assets/benefits/terms/botanica.pdf",

  },
  {
    category: "Restaurantes",
    name: "Mamá Panchita",
    discount: "10%",
    image: "/assets/benefits/club/mama-panchita.webp",
    description: "En toda su carta de carnes.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/mama-panchita.pdf",


  },
  {
    category: "Salud",
    name: "Clínica Dermatológica Roald",
    discount: "30%",
    image: "/assets/benefits/club/roald.webp",
    description:
      "En limpiezas faciales, terapia LED, depilación láser y consultas.",
        terms: "Aplican términos y condiciones según la marca aliada.",
            termsHref: "/assets/benefits/terms/dermatologica-roald.pdf",


  },
  {
    category: "Salud",
    name: "Estudio Dental Essana",
    discount: "Dsctos. exclusivos",
    image: "/assets/benefits/club/essana.webp",
    description:
      "Consulta general gratis y descuentos especiales en tratamientos.",
        terms: "Aplican términos y condiciones según la marca aliada.",
            termsHref: "/assets/benefits/terms/dental-essana.pdf",


  },
  {
    category: "Belleza / Bienestar",
    name: "Montalvo",
    discount: "20%",
    image: "/assets/benefits/club/montalvo.webp",
    description: "En estética, spa y barbería: cortes, tintes, masajes y más.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/montalvo.pdf",


  },
  {
    category: "Belleza / Bienestar",
    name: "Daphne Makeup",
    discount: "50%",
    image: "/assets/benefits/club/daphne-makeup.webp",
    description: "En maquillaje, peinado y manicure profesional.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/daphne-makeup.pdf",


  },
  {
    category: "Belleza / Bienestar",
    name: "Idola Spa",
    discount: "50%",
    image: "/assets/benefits/club/idola-spa.webp",
    description:
      "En cortes, tintes, alisados, masajes e hidratación capilar.",
        terms: "Aplican términos y condiciones según la marca aliada.",
            termsHref: "/assets/benefits/terms/idola-spa.pdf",


  },
  {
    category: "Alimentos y bebidas",
    name: "Sulpaa",
    discount: "Dsctos. exclusivos",
    image: "/assets/benefits/club/sulpaa.webp",
    description: "Precios especiales en bebidas y productos seleccionados.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/sulpaa.pdf",


  },
  {
    category: "Regalos / Detalles",
    name: "Modo Detalle",
    discount: "20%",
    image: "/assets/benefits/club/modo-detalle.webp",
    description: "En ramos personalizados y delicados detalles de caja.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/modo-detalle.pdf",


  },
  {
    category: "Equipamiento",
    name: "Soluz",
    discount: "37%",
    image: "/assets/benefits/club/soluz.webp",
    description: "En cocinas empotradas y productos domésticos.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/sololuz.pdf",


  },
  {
    category: "Agua / Recargas",
    name: "Aquady",
    discount: "Dsctos. exclusivos",
    image: "/assets/benefits/club/aquady.webp",
    description: "Precios especiales en bidones, recargas y packs de botellas.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/aquady.pdf",


  },
  {
    category: "Mascotas",
    name: "Jeldic",
    discount: "10%",
    image: "/assets/benefits/club/jeldic.webp",
    description: "En alimento para perros y gatos.",
      terms: "Aplican términos y condiciones según la marca aliada.",
          termsHref: "/assets/benefits/terms/jeldic.pdf",


  },
];

const getBenefitType = (slug: string): ModalType => {
  if (slug === "socio-referido") return "referidos";
  if (slug === "compramos-tu-terreno") return "terrenos";
  return "club";
};

const getModalInfo = (benefit: Benefit): ModalInfo => {
  const type = getBenefitType(benefit.slug);

  if (type === "referidos") {
    return {
      type,
      eyebrow: "Socio referido ANCOSUR",
      title: "¡Gana S/ 500 por referir!",
      description:
        "Si eres propietario ANCOSUR, participa en nuestro programa de referidos y obtén un beneficio cuando tu referido concrete su compra.",
    };
  }

  if (type === "terrenos") {
    return {
      type,
      eyebrow: "Compramos tu terreno",
      title: "Hacemos historia en tu propiedad",
      description:
        "Buscamos terrenos con potencial para desarrollar nuevos proyectos inmobiliarios. Déjanos tus datos y nuestro equipo evaluará tu propuesta.",
    };
  }

  return {
    type,
    eyebrow: "Club de beneficios",
    title: "Beneficios exclusivos por tu compra",
    description:
      "Al comprar con ANCOSUR accedes a descuentos y promociones especiales con nuestras marcas aliadas.",
  };
};

export default function BeneficiosClient() {
  const [activeBenefit, setActiveBenefit] = useState<Benefit | null>(null);

  const activeModal = useMemo(() => {
    if (!activeBenefit) return null;
    return getModalInfo(activeBenefit);
  }, [activeBenefit]);

  const closeModal = () => {
    setActiveBenefit(null);
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Beneficios ANCOSUR</span>
            <h1>
              Programas pensados para clientes, propietarios e inversionistas
            </h1>
            <p>
              Más formas de ganar, ahorrar e invertir con ANCOSUR. Conoce
              nuestros beneficios y elige el programa que más se adapta a ti.
            </p>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <div className={styles.sectionHeader}>
            <span>Programas disponibles</span>
            <h2>Elige el beneficio que necesitas</h2>
          </div>

          <div className={styles.grid}>
            {benefits.map((benefit) => (
              <article key={benefit.id} className={styles.card}>
                <div className={styles.imageBox}>
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <span>{benefit.title}</span>
                  <h3>{benefit.shortDescription}</h3>

                  {benefit.description && <p>{benefit.description}</p>}

                  <button type="button" onClick={() => setActiveBenefit(benefit)}>
                    {benefit.cta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <span>¿Quieres acceder a un beneficio?</span>
            <h2>Comunícate con nuestro equipo y recibe asesoría personalizada</h2>
            <p>
              Te ayudamos a resolver tus dudas sobre nuestros programas,
              beneficios y oportunidades inmobiliarias.
            </p>
          </div>

          <a
            href="https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20los%20beneficios%20ANCOSUR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </section>
      </main>

      {activeBenefit && activeModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={activeModal.title}
        >
          <div
            className={`${styles.modal} ${
              activeModal.type === "club" ? styles.clubModal : ""
            }`}
          >
            <button
              type="button"
              onClick={closeModal}
              className={styles.closeButton}
              aria-label="Cerrar modal"
            >
              ×
            </button>

            {activeModal.type !== "club" && (
              <div className={styles.modalHeader}>
                <span>{activeModal.eyebrow}</span>
                <h2>{activeModal.title}</h2>
                <p>{activeModal.description}</p>
              </div>
            )}

            {activeModal.type === "referidos" && (
              <>
                <div className={styles.stepsGrid}>
                  <article>
                    <strong>1</strong>
                    <h3>Ingresa tus datos</h3>
                    <p>
                      Registra tu información y los datos de la persona que
                      deseas referir.
                    </p>
                  </article>

                  <article>
                    <strong>2</strong>
                    <h3>Contactamos al referido</h3>
                    <p>
                      Nuestro equipo comercial se comunica, brinda información y
                      cotiza el proyecto de interés.
                    </p>
                  </article>

                  <article>
                    <strong>3</strong>
                    <h3>Ganas tu beneficio</h3>
                    <p>
                      Si el referido separa y firma la minuta compra-venta,
                      accedes al beneficio de S/ 500.
                    </p>
                  </article>
                </div>

                <div className={styles.modalActions}>
                  <a
                    href={activeBenefit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Participar ahora
                  </a>
                </div>
              </>
            )}

            {activeModal.type === "club" && (
              <div className={styles.clubBenefitsWrap}>
                <div className={styles.clubHeader}>
                  <span>Beneficios por tu compra</span>
                  <h2>Ahorra en tus marcas favoritas</h2>
                  <p>
                    Presenta tu constancia de compra ANCOSUR y accede a
                    descuentos especiales en restaurantes, salud, belleza,
                    bienestar, servicios, equipamiento y más.
                  </p>
                </div>

                <div className={styles.clubBenefitsGrid}>
                  {clubBenefits.map((item) => (
                    <article key={item.name} className={styles.clubBenefitCard}>
                      <div className={styles.clubImageBox}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={360}
                          height={220}
                          className={styles.clubImage}
                        />
                      </div>

                      <div className={styles.clubInfo}>
                        <span>{item.category}</span>
                        <h3>{item.name}</h3>

                        <div className={styles.clubDiscount}>
                          <strong>{item.discount}</strong>
                          <small>Beneficio ANCOSUR</small>
                        </div>

                        <p>{item.description}</p>

                        <a
  href={item.termsHref}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.clubTerms}
>
  {item.terms}
</a>
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.clubPosterActions}>
                  <a
                    href={activeBenefit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar beneficio
                  </a>
                </div>
              </div>
            )}

            {activeModal.type === "terrenos" && (
              <form
                className={styles.terrainForm}
                action="/api/leads"
                method="post"
              >
                <input
                  type="hidden"
                  name="source"
                  value="compramos-tu-terreno"
                />

                <div className={styles.formTitle}>
                  <h3>Compramos tu terreno</h3>
                  <p>Déjanos tus datos y nos contactaremos contigo.</p>
                </div>

                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nombres"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Celular"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Ubicación"
                    required
                  />
                  <input
                    type="text"
                    name="district"
                    placeholder="Distrito"
                    required
                  />
                  <input
                    type="text"
                    name="reference"
                    placeholder="Referencia de ubicación"
                  />
                  <input
                    type="text"
                    name="registryNumber"
                    placeholder="N° de partida"
                  />

                  <select name="currency" defaultValue="">
                    <option value="" disabled>
                      Moneda
                    </option>
                    <option value="Soles">Soles</option>
                    <option value="Dólares">Dólares</option>
                  </select>

                  <input
                    type="text"
                    name="price"
                    placeholder="Precio del terreno"
                  />

                  <textarea name="message" placeholder="Mensaje" />
                </div>

                <button type="submit">Enviar mensaje</button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}