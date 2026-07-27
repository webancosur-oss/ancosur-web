"use client";

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  UIEvent as ReactUIEvent,
} from "react";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./HoldingSection.module.css";

/*==================================================
  TIPOS
==================================================*/

type CompanyId =
  | "ancosur"
  | "straton"
  | "zagari"
  | "darkham"
  | "sulpaa"
  | "tercer-espacio";

type Company = {
  id: CompanyId;
  name: string;
  category: string;
  description: string;
  href: string;
  logo: string;
  background: string;
  tone: string;
};

/*==================================================
  EMPRESAS
==================================================*/

const companies: Company[] = [
  {
    id: "ancosur",
    name: "",
    category: "Desarrollo inmobiliario",
    description:
      "",
    href: "/nosotros",
    logo: "/assets/images/ancosur-logo.svg",
    background: "/assets/projects/tarjetas/balto.webp",
    tone: "#00a74f",
  },
  {
    id: "straton",
    name: "",
    category: "Construcción",
    description:
      "",
    href: "#",
    logo: "/assets/images/straton.svg",
    background: "/assets/projects/tarjetas/rivera.webp",
    tone: "#185d36",
  },
  {
    id: "zagari",
    name: "",
    category: "Resort y turismo",
    description:
      "",
    href: "https://zagari.pe/",
    logo: "/assets/images/zagari.svg",
    background: "/assets/projects/tarjetas/xport.webp",
    tone: "#4aaa72",
  },
  {
    id: "darkham",
    name: "",
    category: "Diseño y arquitectura",
    description:
      "",
    href: "#",
    logo: "/assets/images/darkham.svg",
    background: "/assets/projects/tarjetas/distrito.webp",
    tone: "#073d25",
  },
  {
    id: "sulpaa",
    name: "",
    category: "Inversión y gestión",
    description:
      "",
    href: "https://sulpaa.com/",
    logo: "/assets/images/sulpaa.svg",
    background: "/assets/projects/tarjetas/origen.webp",
    tone: "#718f43",
  },
  {
    id: "tercer-espacio",
    name: "",
    category: "Podcast y comunidad",
    description:
      "",
    href:
      "https://open.spotify.com/show/4MlsSTgEjZAUKhd9SsQ5tp",
    logo: "/assets/images/tercer-espacio.svg",
    background: "/assets/projects/tarjetas/emperatriz.webp",
    tone: "#9dbb4d",
  },
];

/*==================================================
  COMPONENTE
==================================================*/

export default function HoldingSection() {
  const [activeCompanyId, setActiveCompanyId] =
    useState<CompanyId>("ancosur");

  const [isMouseDragging, setIsMouseDragging] =
    useState(false);

  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<
    Partial<Record<CompanyId, HTMLElement | null>>
  >({});

  const animationFrameRef =
    useRef<number | null>(null);

  const pointerRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const activeCompany = useMemo<Company>(() => {
    return (
      companies.find(
        (company) =>
          company.id === activeCompanyId,
      ) ?? companies[0]
    );
  }, [activeCompanyId]);

  const activeIndex = useMemo(() => {
    const index = companies.findIndex(
      (company) =>
        company.id === activeCompanyId,
    );

    return index >= 0 ? index : 0;
  }, [activeCompanyId]);

  /*==================================================
    OBTENER EMPRESA MÁS CERCANA AL CENTRO
  ==================================================*/

  const getClosestCompany =
    useCallback((): Company | null => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return null;
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const viewportCenter =
        viewportRect.left +
        viewportRect.width / 2;

      let closestCompany: Company | null =
        null;

      let closestDistance =
        Number.POSITIVE_INFINITY;

      for (const company of companies) {
        const card =
          cardRefs.current[company.id];

        if (!card) {
          continue;
        }

        const cardRect =
          card.getBoundingClientRect();

        const cardCenter =
          cardRect.left +
          cardRect.width / 2;

        const distance = Math.abs(
          viewportCenter - cardCenter,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCompany = company;
        }
      }

      return closestCompany;
    }, []);

  /*==================================================
    ACTUALIZAR TARJETA ACTIVA
  ==================================================*/

  const updateActiveCompany =
    useCallback(() => {
      const closestCompany =
        getClosestCompany();

      if (closestCompany === null) {
        return;
      }

      setActiveCompanyId((current) =>
        current === closestCompany.id
          ? current
          : closestCompany.id,
      );
    }, [getClosestCompany]);

  /*==================================================
    CENTRAR UNA TARJETA
  ==================================================*/

  const centerCompany = useCallback(
    (
      companyId: CompanyId,
      behavior: ScrollBehavior = "smooth",
    ) => {
      const viewport = viewportRef.current;
      const card =
        cardRefs.current[companyId];

      if (!viewport || !card) {
        return;
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const cardRect =
        card.getBoundingClientRect();

      const cardCenterInsideViewport =
        cardRect.left -
        viewportRect.left +
        viewport.scrollLeft +
        cardRect.width / 2;

      const targetScrollLeft =
        cardCenterInsideViewport -
        viewport.clientWidth / 2;

      viewport.scrollTo({
        left: targetScrollLeft,
        behavior,
      });

      setActiveCompanyId(companyId);
    },
    [],
  );

  /*==================================================
    NAVEGACIÓN
  ==================================================*/

  const selectPrevious =
    useCallback(() => {
      const previousIndex =
        (activeIndex -
          1 +
          companies.length) %
        companies.length;

      centerCompany(
        companies[previousIndex].id,
      );
    }, [activeIndex, centerCompany]);

  const selectNext = useCallback(() => {
    const nextIndex =
      (activeIndex + 1) %
      companies.length;

    centerCompany(
      companies[nextIndex].id,
    );
  }, [activeIndex, centerCompany]);

  /*==================================================
    SCROLL NATIVO

    Solo actualiza la tarjeta activa.
    No vuelve a ejecutar centerCompany().
    Esto evita el salto hasta las últimas tarjetas
    en dispositivos móviles.
  ==================================================*/

  const handleScroll = (
    _event: ReactUIEvent<HTMLDivElement>,
  ) => {
    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        updateActiveCompany();
      });
  };

  /*==================================================
    ARRASTRE CON MOUSE

    En móvil no se ejecuta esta lógica.
    El navegador controla el swipe y la inercia.
  ==================================================*/

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (target.closest("a, button")) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    pointerRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft:
        viewport.scrollLeft,
      moved: false,
    };

    setIsMouseDragging(true);

    viewport.setPointerCapture(
      event.pointerId,
    );
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const viewport = viewportRef.current;
    const pointer = pointerRef.current;

    if (
      !viewport ||
      !pointer.active ||
      pointer.pointerId !==
        event.pointerId
    ) {
      return;
    }

    const movement =
      event.clientX - pointer.startX;

    if (Math.abs(movement) > 5) {
      pointer.moved = true;
    }

    viewport.scrollLeft =
      pointer.startScrollLeft -
      movement;

    event.preventDefault();
  };

  const finishPointer = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const viewport = viewportRef.current;
    const pointer = pointerRef.current;

    if (
      !pointer.active ||
      pointer.pointerId !==
        event.pointerId
    ) {
      return;
    }

    if (
      viewport?.hasPointerCapture(
        event.pointerId,
      )
    ) {
      viewport.releasePointerCapture(
        event.pointerId,
      );
    }

    pointerRef.current.active = false;

    setIsMouseDragging(false);

    const closestCompany =
      getClosestCompany();

    /*
     * Este centrado solo ocurre después
     * del arrastre con mouse.
     */
    if (closestCompany !== null) {
      window.setTimeout(() => {
        centerCompany(
          closestCompany.id,
          "smooth",
        );
      }, 50);
    }
  };

  /*==================================================
    TECLADO
  ==================================================*/

  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectNext();
    }

    if (event.key === "Home") {
      event.preventDefault();

      centerCompany(
        companies[0].id,
      );
    }

    if (event.key === "End") {
      event.preventDefault();

      centerCompany(
        companies[
          companies.length - 1
        ].id,
      );
    }
  };

  /*==================================================
    TARJETA INICIAL
  ==================================================*/

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        centerCompany(
          "ancosur",
          "auto",
        );

        updateActiveCompany();
      }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    centerCompany,
    updateActiveCompany,
  ]);

  /*==================================================
    LIMPIEZA
  ==================================================*/

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }
    };
  }, []);

  return (
    <section
      className={styles.section}
      style={
        {
          "--active-tone":
            activeCompany.tone,
        } as CSSProperties
      }
      aria-labelledby="holding-title"
    >
      <div
        className={styles.backgroundGlow}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* CABECERA */}

        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Ecosistema empresarial
            </span>

            <h2 id="holding-title">
              Empresas que construyen futuro
            </h2>
          </div>

          <p>
            Un ecosistema especializado en
            desarrollo inmobiliario,
            construcción, arquitectura,
            turismo, inversión y comunidad.
          </p>
        </header>

        {/* CARRUSEL */}

        <div className={styles.carousel}>
          {/* FLECHA IZQUIERDA */}

          <button
            type="button"
            className={`${styles.sideArrow} ${styles.sideArrowLeft}`}
            onClick={selectPrevious}
            aria-label="Ver empresa anterior"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* VIEWPORT */}

          <div
            ref={viewportRef}
            className={`${styles.cardsViewport} ${
              isMouseDragging
                ? styles.dragging
                : ""
            }`}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Empresas del Holding"
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={finishPointer}
            onPointerCancel={
              finishPointer
            }
            onPointerLeave={(event) => {
              if (
                pointerRef.current.active
              ) {
                finishPointer(event);
              }
            }}
            onKeyDown={handleKeyDown}
          >
            <div className={styles.cardsTrack}>
              {companies.map(
                (company, index) => {
                  const isActive =
                    activeCompanyId ===
                    company.id;

                  const hasWebsite =
                    company.href !== "#";

                  const isExternal =
                    company.href.startsWith(
                      "http",
                    );

                  return (
                    <article
                      key={company.id}
                      ref={(element) => {
                        cardRefs.current[
                          company.id
                        ] = element;
                      }}
                      className={`${styles.card} ${
                        isActive
                          ? styles.cardActive
                          : ""
                      }`}
                      style={
                        {
                          "--company-tone":
                            company.tone,
                        } as CSSProperties
                      }
                      aria-current={
                        isActive
                          ? "true"
                          : undefined
                      }
                      onClick={() => {
                        if (
                          pointerRef.current
                            .moved
                        ) {
                          pointerRef.current.moved =
                            false;

                          return;
                        }

                        centerCompany(
                          company.id,
                        );
                      }}
                    >
                      {/* IMAGEN */}

                      <Image
                        src={
                          company.background
                        }
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="
                          (max-width: 640px) 84vw,
                          (max-width: 1024px) 48vw,
                          340px
                        "
                        className={
                          styles.cardImage
                        }
                        draggable={false}
                      />

                      <div
                        className={
                          styles.cardOverlay
                        }
                        aria-hidden="true"
                      />

                      {/* NÚMERO */}

                      <span
                        className={
                          styles.companyIndex
                        }
                      >
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      {/* LOGO */}

                      <div
                        className={
                          styles.cardLogo
                        }
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={260}
                          height={110}
                          className={
                            styles.cardLogoImage
                          }
                          draggable={false}
                        />
                      </div>

                      {/* CONTENIDO */}

                      <div
                        className={
                          styles.cardContent
                        }
                      >
                        <span
                          className={
                            styles.category
                          }
                        >
                          {
                            company.category
                          }
                        </span>

                        <h3>
                          {company.name}
                        </h3>

                        <p>
                          {
                            company.description
                          }
                        </p>

                        <div
                          className={
                            styles.cardMeta
                          }
                        >
                          <span>
                            Huancayo
                          </span>

                          <span>
                            Grupo ANCOSUR
                          </span>
                        </div>

                        {hasWebsite ? (
                          <a
                            href={company.href}
                            target={
                              isExternal
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className={
                              styles.cardButton
                            }
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                          >
                            Conocer empresa

                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M7 17 17 7M9 7h8v8" />
                            </svg>
                          </a>
                        ) : (
                          <span
                            className={`${styles.cardButton} ${styles.disabledButton}`}
                          >
                            Próximamente
                          </span>
                        )}
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </div>

          {/* FLECHA DERECHA */}

          <button
            type="button"
            className={`${styles.sideArrow} ${styles.sideArrowRight}`}
            onClick={selectNext}
            aria-label="Ver siguiente empresa"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* INDICADORES */}

        <div
          className={styles.indicators}
          aria-label="Seleccionar empresa"
        >
          {companies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() =>
                centerCompany(company.id)
              }
              className={`${styles.indicator} ${
                activeCompanyId ===
                company.id
                  ? styles.indicatorActive
                  : ""
              }`}
              aria-label={`Mostrar ${company.name}`}
              aria-current={
                activeCompanyId ===
                company.id
                  ? "true"
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}