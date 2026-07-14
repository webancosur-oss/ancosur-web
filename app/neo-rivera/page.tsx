import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NeoRiveraAmenitiesSlider from "./components/NeoRiveraAmenitiesSlider";
import NeoRiveraHero from "./components/NeoRiveraHero";
import NeoRiveraLocation from "./components/NeoRiveraLocation";

import styles from "./NeoRiveraPage.module.css";
import NeoRiveraOverviewSection from "./components/NeoRiveraOverviewSection";
import NeoRiveraMedia from "./components/NeoRiveraMedia";
import ProjectFilter from "@/components/ProjectFilter";

export const metadata = {
  title: "Neo Rivera | Departamentos Wellness en Huancayo",
  description:
    "Neo Rivera es un edificio wellness en La Ribera, Huancayo, con departamentos de 2 habitaciones, amenidades para el bienestar y áreas desde 57 m².",
};

export default function NeoRiveraPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <NeoRiveraHero />

        <NeoRiveraOverviewSection />

        <NeoRiveraMedia />

        <NeoRiveraAmenitiesSlider />

        <NeoRiveraLocation />
      
      <ProjectFilter />
        
        <p className={styles.disclaimer}>
          Todas las imágenes, planos, medidas y áreas son referenciales y pueden
          presentar modificaciones durante el desarrollo del proyecto.
        </p>
      </main>

    </>
  );
}