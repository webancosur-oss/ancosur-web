"use client";

import { useState, type ReactNode } from "react";
import styles from "./FAQSection.module.css";

type FAQItem = {
  question: string;
  answer: ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "¿Dónde está ubicado ANCOSUR?",
    answer: (
      <>
        Nuestra oficina de ventas está ubicada en Av. San Carlos 1481, San
        Antonio, Huancayo. También puedes comunicarte al{" "}
        <strong className={styles.greenText}>971 069 763</strong>.
      </>
    ),
  },
  {
    question: "¿Qué opciones de financiamiento ofrecen?",
    answer: (
      <>
        Contamos con dos alternativas: crédito hipotecario con cualquier entidad
        bancaria y financiamiento directo con ANCOSUR en proyectos
        seleccionados. Nuestro equipo te asesora para encontrar la opción que
        mejor se adapte a tus necesidades.
      </>
    ),
  },
  {
    question: "¿Cuál es la cuota inicial para comprar un departamento?",
    answer: (
      <>
        Generalmente, la cuota inicial es del 10% del valor del inmueble. En
        algunos proyectos puedes separar tu departamento desde S/ 20,000, sujeto
        a las condiciones comerciales vigentes.
      </>
    ),
  },
  {
    question: "¿Puedo comprar un departamento aunque no tenga crédito aprobado?",
    answer: (
      <>
        Sí. En proyectos en preventa puedes separar tu departamento y gestionar
        el crédito hipotecario más adelante, cuando el proyecto se encuentre
        próximo a su entrega.
      </>
    ),
  },
  {
    question: "¿Cuáles son los beneficios del Fondo MiVivienda?",
    answer: (
      <>
        El Fondo MiVivienda puede brindar facilidades de financiamiento y bonos
        según el perfil del comprador, el tipo de inmueble y las condiciones
        vigentes del programa.
      </>
    ),
  },
  {
    question: "¿Puedo financiar directamente con ANCOSUR?",
    answer: (
      <>
        Sí. Contamos con financiamiento directo en proyectos seleccionados. Un
        asesor te explicará las condiciones, cuotas y plan de pagos disponible
        para cada proyecto.
      </>
    ),
  },
  {
    question: "¿Qué documentos necesito para iniciar mi compra?",
    answer: (
      <>
        Para iniciar solo necesitas presentar tu Documento Nacional de Identidad
        —DNI—. Luego, nuestro equipo te orientará sobre los demás documentos
        necesarios según el tipo de financiamiento.
      </>
    ),
  },
  {
    question: "¿Puedo comprar si trabajo de manera independiente?",
    answer: (
      <>
        Sí. Si eres independiente, evaluamos tu situación económica y te
        orientamos sobre la documentación necesaria para gestionar tu
        financiamiento.
      </>
    ),
  },
  {
    question: "¿Qué proyectos tienen disponibles?",
    answer: (
      <>
        Tenemos proyectos de departamentos, lotes y resorts en diferentes
        etapas: lanzamiento, preventa, construcción y entrega inmediata. En
        ANCOSUR te ayudamos a encontrar el proyecto ideal para vivir o invertir.
      </>
    ),
  },
  {
    question: "¿Cómo agendo una visita?",
    answer: (
      <>
        Puedes agendar una visita comunicándote con nuestro equipo comercial por
        WhatsApp o llamando al{" "}
        <strong className={styles.greenText}>971 069 763</strong>. También
        puedes dejar tus datos en nuestra web para recibir asesoría.
      </>
    ),
  },
  {
    question: "¿Cómo puedo financiar la compra de mi inmueble?",
    answer: (
      <>
        Puedes adquirir tu inmueble mediante crédito hipotecario con el banco de
        tu preferencia o, en determinados proyectos, acceder a financiamiento
        directo con ANCOSUR. Te acompañamos durante todo el proceso para que
        tomes la mejor decisión.
      </>
    ),
  },
  {
    question: "¿Cómo funciona el financiamiento de mi inmueble?",
    answer: (
      <>
        El financiamiento depende del monto, la cuota inicial, el plazo y la
        tasa de interés. Nuestros asesores elaboran una proyección personalizada
        para que conozcas el valor estimado de tus cuotas antes de decidir.
      </>
    ),
  },
  {
    question: "¿Cómo sé si califico para un crédito hipotecario?",
    answer: (
      <>
        Nuestros asesores realizan una evaluación preliminar de tus ingresos y
        capacidad de pago para orientarte sobre tus posibilidades de acceder a
        un crédito hipotecario y ayudarte a prepararte para la evaluación
        bancaria.
      </>
    ),
  },
  {
    question: "¿Con qué bancos trabaja ANCOSUR?",
    answer: (
      <>
        Trabajamos con diferentes entidades financieras del país. Podemos
        orientarte para gestionar tu financiamiento con el banco que mejor se
        adapte a tu perfil y necesidades.
      </>
    ),
  },
  {
    question: "¿Aceptan crédito hipotecario?",
    answer: (
      <>
        Sí. Puedes adquirir tu departamento mediante crédito hipotecario, sujeto
        a evaluación bancaria. En ANCOSUR te acompañamos para que el proceso sea
        más claro y ordenado.
      </>
    ),
  },
  {
    question: "¿Qué beneficios obtengo al comprar con ANCOSUR?",
    answer: (
      <>
        Recibes asesoría personalizada desde la separación de tu inmueble hasta
        la entrega. Te acompañamos en cada etapa para que tu compra sea segura,
        transparente y bien informada.
      </>
    ),
  },
  {
    question: "¿ANCOSUR es una empresa peruana?",
    answer: (
      <>
        Sí. ANCOSUR es una empresa peruana dedicada al desarrollo de proyectos
        inmobiliarios, con experiencia en departamentos, lotes y proyectos de
        inversión.
      </>
    ),
  },
  {
    question: "¿En qué distritos tienen departamentos en venta?",
    answer: (
      <>
        Nuestros proyectos se desarrollan principalmente en Huancayo, San
        Antonio, San Carlos y El Tambo, según disponibilidad comercial.
      </>
    ),
  },
  {
    question: "¿Qué es el valor cuota?",
    answer: (
      <>
        Es el monto aproximado que pagarías mensualmente por el financiamiento
        de tu departamento, calculado según el precio, la inicial, el plazo y la
        tasa de interés.
      </>
    ),
  },
  {
    question: "¿Qué es una tasa de interés?",
    answer: (
      <>
        Es el porcentaje que aplica una entidad financiera al préstamo
        hipotecario. Este valor influye directamente en el monto de tus cuotas.
      </>
    ),
  },
  {
    question: "¿Qué es Ahorro Casa?",
    answer: (
      <>
        Es una modalidad de ahorro que puede ayudarte a reunir la inicial o
        demostrar capacidad de pago para acceder a una vivienda.
      </>
    ),
  },
  {
    question: "¿Qué es un edificio eco amigable y cuáles son sus beneficios?",
    answer: (
      <>
        Es un edificio diseñado para reducir el consumo de recursos. Puede
        incluir sistemas de ahorro de agua, eficiencia energética y espacios más
        funcionales.
      </>
    ),
  },
  {
    question: "¿Qué es financiamiento directo?",
    answer: (
      <>
        Es una modalidad en la que el comprador acuerda pagos directamente con
        la inmobiliaria, según las condiciones establecidas para cada proyecto.
      </>
    ),
  },
  {
    question: "¿Qué es una carta fianza?",
    answer: (
      <>
        Es un documento emitido por una entidad financiera que garantiza el
        cumplimiento de una obligación económica dentro de una operación.
      </>
    ),
  },
  {
    question: "¿Puedo usar mi seguro personal en vez del desgravamen?",
    answer: (
      <>
        Dependerá de la entidad financiera y de las condiciones del crédito. Lo
        recomendable es consultarlo directamente con el banco antes de iniciar el
        proceso.
      </>
    ),
  },
];

const INITIAL_VISIBLE_COUNT = 8;

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_COUNT);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll((current) => {
      const nextValue = !current;

      if (current && activeIndex !== null && activeIndex >= INITIAL_VISIBLE_COUNT) {
        setActiveIndex(null);
      }

      return nextValue;
    });
  };

  return (
    <section className={styles.section} id="preguntas-frecuentes">
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Preguntas frecuentes</span>
          <h2>Resolvemos tus dudas antes de comprar</h2>
          <p>
            Conoce las respuestas más importantes sobre financiamiento, crédito
            hipotecario, cuota inicial, proyectos y proceso de compra.
          </p>
        </div>

        <div className={styles.accordion}>
          {visibleFaqs.map((item, index) => {
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

        <div className={styles.showMoreWrap}>
          <button
            type="button"
            onClick={toggleShowAll}
            className={styles.showMoreButton}
          >
            {showAll ? "Mostrar menos preguntas" : "Mostrar más preguntas"}
          </button>
        </div>

        <div className={styles.faqCta}>
          <div>
            <span>Asesoría personalizada</span>
            <h3>Te ayudamos a lograr tu compra.</h3>
            <p>
              Escríbenos y recibe orientación según tu presupuesto, forma de
              pago y proyecto de interés.
            </p>
          </div>

          <a
            href="https://wa.me/51971069763"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.faqButton}
          >
            Contactar al <strong>971 069 763</strong>
          </a>
        </div>
      </div>
    </section>
  );
}