import type { Metadata } from "next";
import Script from "next/script";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import CyberEventInfo from "./components/CyberEventInfo";
import CyberHero from "./components/CyberHero";
import CyberHouseLeadForm from "./components/CyberHouseLeadForm";
import CyberProjects from "./components/CyberProjects";

import {
  CYBER_HOUSE_END,
  CYBER_HOUSE_LOCATION,
  CYBER_HOUSE_START,
} from "./data";

import styles from "./CyberHousePage.module.css";

export const metadata: Metadata = {
  title:
    "Cyber House ANCOSUR | Evento inmobiliario",
  description:
    "Participa en el Cyber House ANCOSUR, conoce proyectos inmobiliarios, recibe asesoría personalizada y consulta beneficios disponibles durante el evento.",
};

export default function CyberHousePage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Cyber House ANCOSUR",
    description:
      "Evento inmobiliario con proyectos, asesoría personalizada y beneficios especiales.",
    startDate: CYBER_HOUSE_START,
    endDate: CYBER_HOUSE_END,
    eventStatus:
      "https://schema.org/EventScheduled",
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name:
        "Sala de ventas ANCOSUR",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          CYBER_HOUSE_LOCATION,
        addressLocality:
          "Huancayo",
        addressRegion: "Junín",
        addressCountry: "PE",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "ANCOSUR Inmobiliaria",
    },
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <CyberHero />
        <CyberProjects />
        <CyberEventInfo />
        <CyberHouseLeadForm />
      </main>

      <Script
        id="cyber-house-event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventSchema
          ),
        }}
      />
    </>
  );
}
