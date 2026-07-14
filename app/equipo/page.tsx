import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamGroups } from "@/data/team";
import styles from "./EquipoPage.module.css";

export const metadata = {
  title: "Nuestro equipo | ANCOSUR Inmobiliaria",
  description:
    "Conoce al equipo de ANCOSUR Inmobiliaria, profesionales que hacen posible nuestros proyectos inmobiliarios.",
};

export default function EquipoPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Nuestro equipo</span>
            <h1>Personas que construyen confianza</h1>
            <p>
              Conoce al equipo que impulsa los proyectos inmobiliarios de
              ANCOSUR.
            </p>
          </div>
        </section>

        {teamGroups.map((group) => (
          <section key={group.area} className={styles.areaSection}>
            <div className={styles.areaHeader}>
              <span>Equipo ANCOSUR</span>
              <h2>{group.area}</h2>
            </div>

            <div className={styles.grid}>
              {group.members.map((member) => (
                <article key={member.id} className={styles.card}>
                  <div className={styles.imageBox}>
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      fill
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.content}>
                    <span>{member.position}</span>
                    <h3>{member.name}</h3>
                    <a href={`tel:+51${member.phone.replace(/\s/g, "")}`}>
                      {member.phone}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      
    </>
  );
}