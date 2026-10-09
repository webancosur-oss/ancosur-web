import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import { createSeoMetadata } from "@/src/seo";

import NeoOrigenAmenitiesSlider from "./components/NeoOrigenAmenitiesSlider";
import NeoOrigenHero from "./components/NeoOrigenHero";
import NeoOrigenLocation from "./components/NeoOrigenLocation";
import NeoOrigenMedia from "./components/NeoOrigenMedia";
import NeoOrigenOverviewSection from "./components/NeoOrigenOverviewSection";

import styles from "./NeoOrigenPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Neo Origen | Departamentos en El Tambo, Huancayo",

  description:
    "Departamentos de 1, 2 y 3 ambientes desde 40 m² en Jr. Libertad 1187, El Tambo, Huancayo, con modernas áreas comunes para vivir o invertir.",

  pathname: "/neo-origen",

  keywords: [
    "Neo Origen",
    "departamentos El Tambo",
    "departamentos Huancayo",
    "departamentos en venta",
    "departamentos modernos",
    "departamentos 1 ambiente",
    "departamentos 2 ambientes",
    "departamentos 3 ambientes",
    "departamentos Jr. Libertad",
    "proyectos inmobiliarios Huancayo",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image: "/og/neo-origen.jpg",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function NeoOrigenPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <ProjectJsonLd
        name="Neo Origen"
        path="/neo-origen"
        image="/og/neo-origen.jpg"
      />

      <NeoOrigenHero />

      <NeoOrigenOverviewSection />

      <NeoOrigenMedia />

      <NeoOrigenAmenitiesSlider />

      <NeoOrigenLocation />

      
      <p className={styles.disclaimer}>
        Todas las imágenes, renders, planos, medidas, áreas,
        precios, acabados, equipamiento y áreas comunes son
        referenciales y pueden presentar modificaciones durante
        el desarrollo del proyecto. La disponibilidad y los
        precios están sujetos a cambios sin previo aviso.
      </p>
    </main>
  );
}