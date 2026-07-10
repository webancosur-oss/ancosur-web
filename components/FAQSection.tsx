"use client";

import { useState } from "react";
import styles from "./FAQSection.module.css";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "¿Dónde está ubicado ANCOSUR?",
    answer:
      "ANCOSUR cuenta con oficina de ventas en Av. San Carlos 1481, San Antonio – Huancayo. 971 069 763",
  },
  {
    question: "¿Aceptan crédito hipotecario?",
    answer:
      "Sí, puedes adquirir tu departamento mediante crédito hipotecario, sujeto a evaluación bancaria.",
  },
  {
    question: "¿Qué proyectos tienen disponibles?",
    answer:
      "Tenemos proyectos de departamentos, lotes y resorts en diferentes etapas: lanzamiento, preventa, construcción y entrega.",
  },
  
  {
    question: "¿Cómo agendo una visita?",
    answer:
      "Puedes agendar una visita comunicándote con nuestro equipo comercial por WhatsApp o llamando a atención al cliente 971 069 763. En ancosur.com encontrarás un formulario de contacto para solicitar información y agendar tu visita.",
  },
   {
    question: "¿Cuáles son los beneficios del Fondo MiVivienda?",
    answer:
      "Puede brindar facilidades de financiamiento y bonos según el perfil del comprador y las condiciones del programa vigente.",
  },
  {
    question: "¿Ancosur es una empresa peruana?",
    answer:
      "Sí, ANCOSUR es una empresa peruana dedicada al desarrollo de proyectos inmobiliarios.",
  },
  {
    question: "¿En qué distritos tienen departamentos en venta?",
    answer:
      "Nuestros proyectos se desarrollan principalmente en Huancayo, San Antonio, San Carlos y El Tambo, según disponibilidad.",
  },
  {
    question: "¿Qué es el valor cuota?",
    answer:
      "Es el monto aproximado que pagarías mensualmente por el financiamiento de tu departamento, según precio, inicial, plazo y tasa.",
  },
  {
    question: "¿Qué es una tasa?",
    answer:
      "La tasa es el porcentaje de interés que aplica una entidad financiera al préstamo hipotecario.",
  },
  {
    question: "¿Qué es Ahorro Casa?",
    answer:
      "Es una modalidad de ahorro orientada a reunir la inicial o demostrar capacidad de pago para acceder a una vivienda.",
  },
 
  {
    question: "¿Qué es un edificio eco amigable y cuáles son sus beneficios?",
    answer:
      "Es un edificio diseñado para reducir el consumo de recursos. Puede incluir ahorro de agua, energía y espacios más eficientes.",
  },
  {
    question: "¿Qué es financiamiento directo?",
    answer:
      "Es una modalidad en la que el comprador acuerda pagos directamente con la inmobiliaria, según las condiciones establecidas.",
  },
  {
    question: "¿Qué es una carta fianza?",
    answer:
      "Es un documento emitido por una entidad financiera que garantiza el cumplimiento de una obligación económica.",
  },
  {
    question: "¿Puedo usar mi seguro personal en vez del desgravamen?",
    answer:
      "Dependerá de la entidad financiera y de las condiciones del crédito. Lo recomendable es consultarlo directamente con el banco.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="preguntas-frecuentes">
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Preguntas frecuentes</span>
          <h2>Resolvemos tus dudas antes de comprar</h2>
          <p>
            Conoce las respuestas a las consultas más comunes sobre nuestros
            proyectos, financiamiento y proceso de compra.
          </p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={item.question}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className={styles.question}
                  aria-expanded={isActive}
                >
                  <span>{item.question}</span>
                  <i aria-hidden="true" />
                </button>

                <div className={styles.answer}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}