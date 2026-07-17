"use client";

import {
  FileTextIcon,
  UploadSimpleIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useMemo,
  useState,
} from "react";
import type { FormEvent } from "react";

import Navbar from "@/components/Navbar";
import FeedbackToast, {
  type FeedbackToastData,
} from "@/components/ui/FeedbackToast/FeedbackToast";

import {
  benefits,
  type Benefit,
} from "@/data/benefits";

import styles from "./BeneficiosPage.module.css";

type ModalType =
  | "referidos"
  | "club"
  | "terrenos";

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

type ToastState = FeedbackToastData & {
  id: number;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  response?: string;
  [key: string]: unknown;
};

const SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Datos enviados correctamente!",
  message:
    "Un asesor de ANCOSUR se comunicará contigo pronto.",
};

const ERROR_TOAST: FeedbackToastData = {
  variant: "error",
  title: "No pudimos enviar tus datos",
  message:
    "Verifica tu conexión e inténtalo nuevamente.",
};

const REFERRAL_SUCCESS_TOAST: FeedbackToastData = {
  variant: "success",
  title: "¡Referido registrado correctamente!",
  message:
    "Nuestro equipo comercial se comunicará con la persona referida.",
};

const REFERRER_NOT_FOUND_TOAST: FeedbackToastData = {
  variant: "error",
  title: "Cliente no registrado",
  message:
    "El referente no está registrado como cliente ANCOSUR.",
};

const REFERRAL_ALREADY_EXISTS_TOAST: FeedbackToastData = {
  variant: "error",
  title: "Referido ya registrado",
  message:
    "Esta persona ya fue registrada anteriormente como referido.",
};

const referralProjects = [
  "Neo Xport",
  "Neo Rivera",
  "Neo Eterna",
  "Neo Balto",
  "Neo Emperatriz",
  "Distrito San Carlos",
  "Neo Origen",
  "Neo 18",
  "Moro 416",
  "Camino Real",
  "Las Colinas de Moro",
  "Zagari Resort Club",
  "Por definir",
] as const;

const clubBenefits: ClubBenefit[] = [
  {
    category: "Restaurantes",
    name: "Botánica",
    discount: "20%",
    image:
      "/assets/benefits/club/botanica.webp",
    description:
      "En toda la carta. Consumo presencial. Válido de lunes a domingo.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/botanica.pdf",
  },
  {
    category: "Restaurantes",
    name: "Mamá Panchita",
    discount: "10%",
    image:
      "/assets/benefits/club/mama-panchita.webp",
    description:
      "En toda su carta de carnes.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/mama-panchita.pdf",
  },
  {
    category: "Salud",
    name:
      "Clínica Dermatológica Roald",
    discount: "30%",
    image:
      "/assets/benefits/club/roald.webp",
    description:
      "En limpiezas faciales, terapia LED, depilación láser y consultas.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/dermatologica-roald.pdf",
  },
  {
    category: "Salud",
    name: "Estudio Dental Essana",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/essana.webp",
    description:
      "Consulta general gratis y descuentos especiales en tratamientos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/dental-essana.pdf",
  },
  {
    category:
      "Belleza / Bienestar",
    name: "Montalvo",
    discount: "20%",
    image:
      "/assets/benefits/club/montalvo.webp",
    description:
      "En estética, spa y barbería: cortes, tintes, masajes y más.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/montalvo.pdf",
  },
  {
    category:
      "Belleza / Bienestar",
    name: "Daphne Makeup",
    discount: "50%",
    image:
      "/assets/benefits/club/daphne-makeup.webp",
    description:
      "En maquillaje, peinado y manicure profesional.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/daphne-makeup.pdf",
  },
  {
    category:
      "Belleza / Bienestar",
    name: "Idola Spa",
    discount: "50%",
    image:
      "/assets/benefits/club/idola-spa.webp",
    description:
      "En cortes, tintes, alisados, masajes e hidratación capilar.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/idola-spa.pdf",
  },
  {
    category:
      "Alimentos y bebidas",
    name: "Sulpaa",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/sulpaa.webp",
    description:
      "Precios especiales en bebidas y productos seleccionados.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/sulpaa.pdf",
  },
  {
    category:
      "Regalos / Detalles",
    name: "Modo Detalle",
    discount: "20%",
    image:
      "/assets/benefits/club/modo-detalle.webp",
    description:
      "En ramos personalizados y delicados detalles de caja.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/modo-detalle.pdf",
  },
  {
    category: "Equipamiento",
    name: "Soluz",
    discount: "37%",
    image:
      "/assets/benefits/club/soluz.webp",
    description:
      "En cocinas empotradas y productos domésticos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/sololuz.pdf",
  },
  {
    category:
      "Agua / Recargas",
    name: "Aquady",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/aquady.webp",
    description:
      "Precios especiales en bidones, recargas y packs de botellas.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/aquady.pdf",
  },
  {
    category: "Mascotas",
    name: "Jeldic",
    discount: "10%",
    image:
      "/assets/benefits/club/jeldic.webp",
    description:
      "En alimento para perros y gatos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/jeldic.pdf",
  },
];

const getBenefitType = (
  slug: string
): ModalType => {
  if (slug === "socio-referido") {
    return "referidos";
  }

  if (
    slug ===
    "compramos-tu-terreno"
  ) {
    return "terrenos";
  }

  return "club";
};

const getModalInfo = (
  benefit: Benefit
): ModalInfo => {
  const type = getBenefitType(
    benefit.slug
  );

  if (type === "referidos") {
    return {
      type,
      eyebrow:
        "Socio referido ANCOSUR",
      title:
        "¡Gana S/ 500 por referir!",
      description:
        "Si eres propietario ANCOSUR, participa en nuestro programa de referidos y obtén un beneficio cuando tu referido concrete su compra.",
    };
  }

  if (type === "terrenos") {
    return {
      type,
      eyebrow:
        "Compramos tu terreno",
      title:
        "Hacemos historia en tu propiedad",
      description:
        "Buscamos terrenos con potencial para desarrollar nuevos proyectos inmobiliarios. Déjanos tus datos y nuestro equipo evaluará tu propuesta.",
    };
  }

  return {
    type,
    eyebrow:
      "Club de beneficios",
    title:
      "Beneficios exclusivos por tu compra",
    description:
      "Al comprar con ANCOSUR accedes a descuentos y promociones especiales con nuestras marcas aliadas.",
  };
};

const parseOptionalNumber = (
  value: FormDataEntryValue | null
): number | null => {
  const normalizedValue = String(
    value ?? ""
  )
    .trim()
    .replace(",", ".");

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(
    normalizedValue
  );

  return Number.isFinite(parsedValue)
    ? parsedValue
    : null;
};

const readApiResponse = async (
  response: Response
): Promise<ApiResponse> => {
  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    contentType?.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  const message =
    await response.text();

  return {
    message,
  };
};

export default function BeneficiosClient() {
  const [
    activeBenefit,
    setActiveBenefit,
  ] = useState<Benefit | null>(null);

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [toast, setToast] =
    useState<ToastState | null>(
      null
    );

  const activeModal =
    useMemo(() => {
      if (!activeBenefit) {
        return null;
      }

      return getModalInfo(
        activeBenefit
      );
    }, [activeBenefit]);

  const closeModal = () => {
    if (isSending) {
      return;
    }

    setActiveBenefit(null);
  };

  const closeToast =
    useCallback(() => {
      setToast(null);
    }, []);

  const showToast = (
    toastData: FeedbackToastData
  ) => {
    setToast({
      ...toastData,
      id: Date.now(),
    });
  };

  const handleReferralSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (isSending) {
        return;
      }

      const form =
        event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData =
        new FormData(form);

      const referrerFullName =
        String(
          formData.get(
            "referrerFullName"
          ) ?? ""
        ).trim();

      const referrerDni = String(
        formData.get(
          "referrerDni"
        ) ?? ""
      ).replace(/\D/g, "");

      const referrerPhone =
        String(
          formData.get(
            "referrerPhone"
          ) ?? ""
        ).replace(/\D/g, "");

      const referrerEmail =
        String(
          formData.get(
            "referrerEmail"
          ) ?? ""
        )
          .trim()
          .toLowerCase();

      const referredFullName =
        String(
          formData.get(
            "referredFullName"
          ) ?? ""
        ).trim();

      const referredDni = String(
        formData.get(
          "referredDni"
        ) ?? ""
      ).replace(/\D/g, "");

      const referredPhone =
        String(
          formData.get(
            "referredPhone"
          ) ?? ""
        ).replace(/\D/g, "");

      const referredEmail =
        String(
          formData.get(
            "referredEmail"
          ) ?? ""
        )
          .trim()
          .toLowerCase();

      const project = String(
        formData.get("project") ??
          ""
      ).trim();

      const consent =
        formData.get(
          "referralConsent"
        ) === "accepted";

      const referralData = {
        referrerFullName,
        referrerDni,
        referrerPhone,
        referrerEmail,

        referredFullName,
        referredDni,
        referredPhone,
        referredEmail,

        project,
        consent,

        campaign:
          "socio-referido-web",

        campania_nombre:
          "Socio Referido ANCOSUR",

        origen_ruta:
          window.location.pathname,

        origen_componente:
          "Formulario Socio Referido",
      };

      try {
        setIsSending(true);
        setToast(null);

        const response =
          await fetch(
            "/api/referral-leads",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                Accept:
                  "application/json",
              },
              body: JSON.stringify(
                referralData
              ),
            }
          );

        const result =
          await readApiResponse(
            response
          );

        if (!response.ok) {
          if (
            result.response ===
            "referral.referrer_not_found"
          ) {
            showToast(
              REFERRER_NOT_FOUND_TOAST
            );

            return;
          }

          if (
            result.response ===
            "referral.already_exists"
          ) {
            showToast(
              REFERRAL_ALREADY_EXISTS_TOAST
            );

            return;
          }

          showToast({
            variant: "error",
            title:
              "No pudimos registrar el referido",
            message:
              result.message ||
              "Verifica los datos e inténtalo nuevamente.",
          });

          return;
        }

        form.reset();
        setActiveBenefit(null);

        showToast(
          REFERRAL_SUCCESS_TOAST
        );
      } catch {
        showToast(ERROR_TOAST);
      } finally {
        setIsSending(false);
      }
    };

  const handleTerrainSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (isSending) {
        return;
      }

      const form =
        event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData =
        new FormData(form);

      const fullName = String(
        formData.get("fullName") ??
          ""
      ).trim();

      const phone = String(
        formData.get("phone") ?? ""
      ).replace(/\D/g, "");

      const email = String(
        formData.get("email") ?? ""
      )
        .trim()
        .toLowerCase();

      const location = String(
        formData.get("location") ??
          ""
      ).trim();

      const district = String(
        formData.get("district") ??
          ""
      ).trim();

      const reference = String(
        formData.get("reference") ??
          ""
      ).trim();

      const registryNumber =
        String(
          formData.get(
            "registryNumber"
          ) ?? ""
        ).trim();

      const currency = Number(
        formData.get("currency")
      );

      const price =
        parseOptionalNumber(
          formData.get("price")
        );

      const areaM2 =
        parseOptionalNumber(
          formData.get("areaM2")
        );

      const message = String(
        formData.get("message") ??
          ""
      ).trim();

      const consent =
        formData.get("consent") ===
        "accepted";

      const terrainData = {
        fullName,
        phone,
        email,

        location,
        district,
        reference,
        registryNumber,

        currency,
        price,
        areaM2,

        message,
        consent,

        campaign:
          "compramos-tu-terreno-web",

        campania_nombre:
          "Compramos tu terreno",

        origen_ruta:
          window.location.pathname,

        origen_componente:
          "Formulario Compramos tu terreno",
      };

      try {
        setIsSending(true);
        setToast(null);

        const response =
          await fetch(
            "/api/terrain-leads",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                Accept:
                  "application/json",
              },
              body: JSON.stringify(
                terrainData
              ),
            }
          );

        const result =
          await readApiResponse(
            response
          );

        if (!response.ok) {
          showToast({
            variant: "error",
            title:
              "No pudimos registrar el terreno",
            message:
              result.message ||
              "Verifica los datos e inténtalo nuevamente.",
          });

          return;
        }

        form.reset();
        setActiveBenefit(null);

        showToast(SUCCESS_TOAST);
      } catch {
        showToast(ERROR_TOAST);
      } finally {
        setIsSending(false);
      }
    };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section
          className={styles.hero}
        >
          <div
            className={
              styles.heroContent
            }
          >
            <span>
              Beneficios ANCOSUR
            </span>

            <h1>
              Programas pensados para
              clientes, propietarios e
              inversionistas
            </h1>

            <p>
              Más formas de ganar,
              ahorrar e invertir con
              ANCOSUR. Conoce nuestros
              beneficios y elige el
              programa que más se
              adapta a ti.
            </p>
          </div>
        </section>

        <section
          className={
            styles.benefitsSection
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <span>
              Programas disponibles
            </span>

            <h2>
              Elige el beneficio que
              necesitas
            </h2>
          </div>

          <div className={styles.grid}>
            {benefits.map(
              (benefit) => (
                <article
                  key={benefit.id}
                  className={
                    styles.card
                  }
                >
                  <div
                    className={
                      styles.imageBox
                    }
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={
                        styles.image
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.content
                    }
                  >
                    <span>
                      {benefit.title}
                    </span>

                    <h3>
                      {
                        benefit.shortDescription
                      }
                    </h3>

                    {benefit.description && (
                      <p>
                        {
                          benefit.description
                        }
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveBenefit(
                          benefit
                        )
                      }
                    >
                      {benefit.cta}
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        <section
          className={styles.cta}
        >
          <div>
            <span>
              ¿Quieres acceder a un
              beneficio?
            </span>

            <h2>
              Comunícate con nuestro
              equipo y recibe asesoría
              personalizada
            </h2>

            <p>
              Te ayudamos a resolver
              tus dudas sobre nuestros
              programas, beneficios y
              oportunidades
              inmobiliarias.
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

      {activeBenefit &&
        activeModal && (
          <div
            className={
              styles.modalOverlay
            }
            role="dialog"
            aria-modal="true"
            aria-label={
              activeModal.title
            }
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeModal();
              }
            }}
          >
            <div
              className={`${styles.modal} ${
                activeModal.type ===
                "club"
                  ? styles.clubModal
                  : ""
              }`}
            >
              <button
                type="button"
                onClick={closeModal}
                className={
                  styles.closeButton
                }
                aria-label="Cerrar modal"
                disabled={isSending}
              >
                ×
              </button>

              {activeModal.type !==
                "club" && (
                <div
                  className={
                    styles.modalHeader
                  }
                >
                  <span>
                    {
                      activeModal.eyebrow
                    }
                  </span>

                  <h2>
                    {
                      activeModal.title
                    }
                  </h2>

                  <p>
                    {
                      activeModal.description
                    }
                  </p>
                </div>
              )}

              {activeModal.type ===
                "referidos" && (
                <>
                  <div
                    className={
                      styles.stepsGrid
                    }
                  >
                    <article>
                      <strong>
                        1
                      </strong>

                      <UploadSimpleIcon
                        size={82}
                        weight="fill"
                        aria-hidden={
                          true
                        }
                      />

                      <h3>
                        Ingresa tus
                        datos
                      </h3>

                      <p>
                        Registra tu
                        información y
                        los datos de la
                        persona que
                        deseas referir.
                      </p>
                    </article>

                    <article>
                      <strong>
                        2
                      </strong>

                      <UserIcon
                        size={82}
                        weight="fill"
                        aria-hidden={
                          true
                        }
                      />

                      <h3>
                        Contactamos al
                        referido
                      </h3>

                      <p>
                        Nuestro equipo
                        comercial se
                        comunica,
                        brinda
                        información y
                        cotiza el
                        proyecto de
                        interés.
                      </p>
                    </article>

                    <article>
                      <strong>
                        3
                      </strong>

                      <FileTextIcon
                        size={82}
                        weight="fill"
                        aria-hidden={
                          true
                        }
                      />

                      <h3>
                        Ganas tu
                        beneficio
                      </h3>

                      <p>
                        Si el referido
                        separa y firma
                        la minuta
                        compra-venta,
                        accedes al
                        beneficio de
                        S/ 500.
                      </p>
                    </article>
                  </div>

                  <form
                    className={
                      styles.terrainForm
                    }
                    onSubmit={
                      handleReferralSubmit
                    }
                  >
                    <div
                      className={
                        styles.formTitle
                      }
                    >
                      <h3>
                        Datos del
                        referente
                      </h3>

                      <p>
                        Ingresa tus
                        datos como
                        propietario
                        ANCOSUR.
                      </p>
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <input
                        type="text"
                        name="referrerFullName"
                        placeholder="Nombres y apellidos"
                        autoComplete="name"
                        minLength={3}
                        maxLength={100}
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="text"
                        name="referrerDni"
                        placeholder="DNI"
                        inputMode="numeric"
                        pattern="[0-9]{8}"
                        minLength={8}
                        maxLength={8}
                        title="Ingresa un DNI válido de 8 dígitos."
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="tel"
                        name="referrerPhone"
                        placeholder="Celular"
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="9[0-9]{8}"
                        minLength={9}
                        maxLength={9}
                        title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="email"
                        name="referrerEmail"
                        placeholder="Correo electrónico"
                        autoComplete="email"
                        maxLength={120}
                        disabled={
                          isSending
                        }
                        required
                      />
                    </div>

                    <div
                      className={
                        styles.formTitle
                      }
                    >
                      <h3>
                        Datos del
                        referido
                      </h3>

                      <p>
                        Registra los
                        datos de la
                        persona
                        interesada en
                        un proyecto
                        ANCOSUR.
                      </p>
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <input
                        type="text"
                        name="referredFullName"
                        placeholder="Nombres y apellidos"
                        autoComplete="name"
                        minLength={3}
                        maxLength={100}
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="text"
                        name="referredDni"
                        placeholder="DNI"
                        inputMode="numeric"
                        pattern="[0-9]{8}"
                        minLength={8}
                        maxLength={8}
                        title="Ingresa un DNI válido de 8 dígitos."
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="tel"
                        name="referredPhone"
                        placeholder="Celular"
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="9[0-9]{8}"
                        minLength={9}
                        maxLength={9}
                        title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                        disabled={
                          isSending
                        }
                        required
                      />

                      <input
                        type="email"
                        name="referredEmail"
                        placeholder="Correo electrónico"
                        autoComplete="email"
                        maxLength={120}
                        disabled={
                          isSending
                        }
                        required
                      />
                    </div>

                    <div
                      className={
                        styles.formTitle
                      }
                    >
                      <h3>
                        Proyecto de
                        interés
                      </h3>
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <select
                        name="project"
                        defaultValue=""
                        disabled={
                          isSending
                        }
                        required
                      >
                        <option
                          value=""
                          disabled
                        >
                          Selecciona un
                          proyecto
                        </option>

                        {referralProjects.map(
                          (
                            project
                          ) => (
                            <option
                              key={
                                project
                              }
                              value={
                                project
                              }
                            >
                              {project ===
                              "Por definir"
                                ? "Aún no sabe qué proyecto elegir"
                                : project}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <label
                      className={
                        styles.checkbox
                      }
                    >
                      <input
                        type="checkbox"
                        name="referralConsent"
                        value="accepted"
                        disabled={
                          isSending
                        }
                        required
                      />

                      <span>
                        He leído y
                        acepto los
                        Términos y
                        Condiciones y
                        la Política de
                        Privacidad.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={
                        isSending
                      }
                      aria-busy={
                        isSending
                      }
                    >
                      {isSending
                        ? "Enviando..."
                        : "Enviar mensaje"}
                    </button>
                  </form>
                </>
              )}

              {activeModal.type ===
                "club" && (
                <div
                  className={
                    styles.clubBenefitsWrap
                  }
                >
                  <div
                    className={
                      styles.clubHeader
                    }
                  >
                    <span>
                      Beneficios por
                      tu compra
                    </span>

                    <h2>
                      Ahorra en tus
                      marcas favoritas
                    </h2>

                    <p>
                      Presenta tu
                      constancia de
                      compra ANCOSUR y
                      accede a
                      descuentos
                      especiales en
                      restaurantes,
                      salud, belleza,
                      bienestar,
                      servicios,
                      equipamiento y
                      más.
                    </p>
                  </div>

                  <div
                    className={
                      styles.clubBenefitsGrid
                    }
                  >
                    {clubBenefits.map(
                      (item) => (
                        <article
                          key={
                            item.name
                          }
                          className={
                            styles.clubBenefitCard
                          }
                        >
                          <div
                            className={
                              styles.clubImageBox
                            }
                          >
                            <Image
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                              width={
                                360
                              }
                              height={
                                220
                              }
                              className={
                                styles.clubImage
                              }
                            />
                          </div>

                          <div
                            className={
                              styles.clubInfo
                            }
                          >
                            <span>
                              {
                                item.category
                              }
                            </span>

                            <h3>
                              {
                                item.name
                              }
                            </h3>

                            <div
                              className={
                                styles.clubDiscount
                              }
                            >
                              <strong>
                                {
                                  item.discount
                                }
                              </strong>

                              <small>
                                Beneficio
                                ANCOSUR
                              </small>
                            </div>

                            <p>
                              {
                                item.description
                              }
                            </p>

                            <a
                              href={
                                item.termsHref
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className={
                                styles.clubTerms
                              }
                            >
                              {
                                item.terms
                              }
                            </a>
                          </div>
                        </article>
                      )
                    )}
                  </div>

                  <div
                    className={
                      styles.clubPosterActions
                    }
                  >
                    <a
                      href={
                        activeBenefit.href
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar
                      beneficio
                    </a>
                  </div>
                </div>
              )}

              {activeModal.type ===
                "terrenos" && (
                <form
                  className={
                    styles.terrainForm
                  }
                  onSubmit={
                    handleTerrainSubmit
                  }
                >
                  <div
                    className={
                      styles.formTitle
                    }
                  >
                    <h3>
                      Compramos tu
                      terreno
                    </h3>

                    <p>
                      Déjanos tus
                      datos y nos
                      contactaremos
                      contigo.
                    </p>
                  </div>

                  <div
                    className={
                      styles.formGrid
                    }
                  >
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nombres completos"
                      autoComplete="name"
                      minLength={3}
                      maxLength={80}
                      disabled={
                        isSending
                      }
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Celular"
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="9[0-9]{8}"
                      minLength={9}
                      maxLength={9}
                      title="Ingresa un celular peruano de 9 dígitos que empiece con 9."
                      disabled={
                        isSending
                      }
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      autoComplete="email"
                      maxLength={120}
                      disabled={
                        isSending
                      }
                      required
                    />

                    <input
                      type="text"
                      name="location"
                      placeholder="Ubicación del terreno"
                      maxLength={150}
                      disabled={
                        isSending
                      }
                      required
                    />

                    <input
                      type="text"
                      name="district"
                      placeholder="Distrito"
                      maxLength={100}
                      disabled={
                        isSending
                      }
                      required
                    />

                    <input
                      type="text"
                      name="reference"
                      placeholder="Referencia de ubicación"
                      maxLength={180}
                      disabled={
                        isSending
                      }
                    />

                    <input
                      type="text"
                      name="registryNumber"
                      placeholder="N.° de partida registral"
                      maxLength={80}
                      disabled={
                        isSending
                      }
                    />

                    <select
                      name="currency"
                      defaultValue=""
                      disabled={
                        isSending
                      }
                      required
                    >
                      <option
                        value=""
                        disabled
                      >
                        Moneda
                      </option>

                      <option value="1">
                        Soles
                      </option>

                      <option value="2">
                        Dólares
                      </option>
                    </select>

                    <input
                      type="number"
                      name="price"
                      placeholder="Precio referencial"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      disabled={
                        isSending
                      }
                    />

                    <input
                      type="number"
                      name="areaM2"
                      placeholder="Área total en m²"
                      inputMode="decimal"
                      min="1"
                      step="0.01"
                      disabled={
                        isSending
                      }
                      required
                    />

                    <textarea
                      name="message"
                      placeholder="Información adicional sobre el terreno"
                      rows={4}
                      maxLength={500}
                      disabled={
                        isSending
                      }
                    />
                  </div>

                  <label
                    className={
                      styles.checkbox
                    }
                  >
                    <input
                      type="checkbox"
                      name="consent"
                      value="accepted"
                      disabled={
                        isSending
                      }
                      required
                    />

                    <span>
                      Acepto ser
                      contactado por
                      ANCOSUR para
                      recibir
                      información
                      sobre la
                      evaluación de
                      mi terreno.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={
                      isSending
                    }
                    aria-busy={
                      isSending
                    }
                  >
                    {isSending
                      ? "Enviando..."
                      : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      <FeedbackToast
        key={toast?.id}
        open={toast !== null}
        variant={
          toast?.variant ?? "info"
        }
        title={toast?.title ?? ""}
        message={toast?.message ?? ""}
        onClose={closeToast}
      />
    </>
  );
}