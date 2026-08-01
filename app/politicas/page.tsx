"use client";

import Link from "next/link";
import { useState } from "react";

import PdfViewer from "@/components/PdfViewer";
import { policies } from "@/data/policies";

import styles from "./PoliticasPage.module.css";

type SelectedDocument = {
  title: string;
  pdf: string;
};

export default function PoliticasPage() {
  const [
    selectedDocument,
    setSelectedDocument,
  ] = useState<SelectedDocument | null>(
    null,
  );

  const closePdfViewer = () => {
    setSelectedDocument(null);
  };

  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div
            className={styles.heroContent}
          >
            <span>
              Documentación oficial
            </span>

            <h1>
              Políticas y documentos
              corporativos
            </h1>

            <p>
              Accede a la documentación
              oficial de ANCOSUR,
              incluyendo documentos del
              Sistema Integrado de Gestión,
              privacidad, términos y
              condiciones.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.header}>
            <span>
              Centro documental
            </span>

            <h2>
              Selecciona el documento que
              deseas consultar
            </h2>

            <p>
              Revisa la documentación
              corporativa y los documentos
              oficiales publicados por
              ANCOSUR.
            </p>
          </div>

          <div className={styles.grid}>
            {policies.map((item) => {
              const cardClassName =
                `${styles.card} ${
                  item.featured
                    ? styles.featured
                    : ""
                }`;

              const cardContent = (
                <>
                  <span
                    className={styles.number}
                  >
                    {String(item.id).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <strong>
                    Ver documento
                  </strong>
                </>
              );

              /*
               * Solo Política SIG y Alcance SIG
               * tienen la propiedad pdf.
               */
              if (item.pdf) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cardClassName}
                    onClick={() => {
                      setSelectedDocument({
                        title: item.title,
                        pdf: item.pdf!,
                      });
                    }}
                    aria-label={`Visualizar ${item.title}`}
                  >
                    {cardContent}
                  </button>
                );
              }

              /*
               * Privacidad, términos y cookies
               * siguen navegando a sus páginas.
               */
              if (item.href) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return null;
            })}
          </div>
        </section>
      </main>

      <PdfViewer
        open={
          selectedDocument !== null
        }
        onClose={closePdfViewer}
        pdf={
          selectedDocument?.pdf ?? ""
        }
        title={
          selectedDocument?.title ?? ""
        }
      />
    </>
  );
}