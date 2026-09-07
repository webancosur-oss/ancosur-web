"use client";

import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

import styles from "./LibroReclamacionesForm.module.css";

/* =========================================================
   TIPOS
========================================================= */

type ComplaintType =
  | "reclamo"
  | "queja";

type DocumentType =
  | "DNI"
  | "PASAPORTE"
  | "CE";

type ContractedType =
  | "producto"
  | "servicio";

type ProjectStatus =
  | "PRE VENTA"
  | "LANZAMIENTO"
  | "EN CONSTRUCCIÓN"
  | "ENTREGA INMEDIATA"
  | "ENTREGADO";

type ProjectType =
  | "Departamento"
  | "Lote"
  | "Resort"
  | "Casas";

type Project = {
  id: number;
  name: string;
  type: ProjectType;
  city: string;
  address: string;
  status: ProjectStatus;
};

type Attachment = {
  id: string;
  file: File;
};

type ComplaintFormData = {
  /* Lugar de los hechos */
  establishment: string;

  /* Tipo */
  type: ComplaintType | "";

  /* Consumidor */
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  documentType: DocumentType;
  documentNumber: string;

  department: string;
  province: string;
  district: string;
  address: string;

  /* Menor */
  isMinor: boolean;

  tutorFirstName: string;
  tutorLastName: string;
  tutorDocumentType: DocumentType;
  tutorDocumentNumber: string;

  /* Bien contratado */
  contractedType:
    | ContractedType
    | "";

  /* Proyecto */
  project: string;

  /* Identificación adicional */
  building: string;
  unit: string;
  operationNumber: string;

  /* Descripción */
  productDescription: string;

  /* Detalle */
  detail: string;
  concreteRequest: string;

  /* Correo */
  notifyByEmail: boolean;

  /* Conformidad */
  acceptsSubmission: boolean;
};

type ApiResponse = {
  success?: boolean;
  message?: string;

  ticket?: string;
  codigo_registro?: string;
  code?: string;

  email_status?: string;
  email_sent_at?: string;
  email_message_id?: string;

  constancia_url?: string;
};

/* =========================================================
   DATOS DEL PROVEEDOR
   REEMPLAZAR LOS VALORES DE CONFIGURACIÓN CUANDO
   TENGAS LOS DATOS LEGALES DEFINITIVOS.
========================================================= */

const PROVIDER = {
  legalName: "ANCOSUR S.A.C.",

  ruc:
    process.env.NEXT_PUBLIC_ANCOSUR_RUC ||
    "CONFIGURAR RUC",

  address:
    process.env.NEXT_PUBLIC_ANCOSUR_LIBRO_DIRECCION ||
    "CONFIGURAR DIRECCIÓN DEL ESTABLECIMIENTO",
};

/* =========================================================
   PROYECTOS ANCOSUR
========================================================= */

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Neo Rivera",
    type: "Departamento",
    city: "LA RIBERA",
    address:
      "Jr. Dalias (Al costado del Parque La Rivera)",
    status: "PRE VENTA",
  },

  {
    id: 2,
    name: "Neo Balto",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Jr. San Agustín 416 (Cerca al parque Grau)",
    status: "PRE VENTA",
  },

  {
    id: 3,
    name: "Neo Xport",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Av. Chorrillos (Cerca al Polideportivo Wanka)",
    status: "EN CONSTRUCCIÓN",
  },

  {
    id: 4,
    name: "Neo Eterna",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Av. San Carlos (Cerca a universidades)",
    status: "PRE VENTA",
  },

  {
    id: 5,
    name: "Neo Origen",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Jr. Libertad 1187 (Cerca al Colegio M. Castilla)",
    status: "EN CONSTRUCCIÓN",
  },

  {
    id: 6,
    name: "Distrito San Carlos",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Jr. Chacabuco (Cerca al centro de Huancayo)",
    status: "PRE VENTA",
  },

  {
    id: 7,
    name: "Moro 416",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Av. Giráldez (Cerca a Real Plaza y parques)",
    status: "EN CONSTRUCCIÓN",
  },

  {
    id: 8,
    name: "Camino Real",
    type: "Lote",
    city: "El Tambo",
    address:
      "Cerca al Fundo Essalud y Universidades",
    status: "EN CONSTRUCCIÓN",
  },

  {
    id: 9,
    name: "Zagari Resort Club",
    type: "Resort",
    city: "San Ramón",
    address:
      "Chanchamayo",
    status: "EN CONSTRUCCIÓN",
  },

  {
    id: 10,
    name: "Las Colinas de Moro",
    type: "Lote",
    city: "Huancayo",
    address:
      "Huancayo",
    status: "ENTREGA INMEDIATA",
  },

  {
    id: 11,
    name: "Las Terrazas de Concepción",
    type: "Lote",
    city: "Concepción",
    address:
      "Junín",
    status: "ENTREGA INMEDIATA",
  },

  {
    id: 12,
    name: "Neo Emperatriz",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Av. San Carlos 1481",
    status: "ENTREGADO",
  },

  {
    id: 13,
    name: "Neo 18",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 14,
    name: "Alta Luz",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 15,
    name: "Serena",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 16,
    name: "Vita",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 17,
    name: "Zenda",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 18,
    name: "Adamant",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 19,
    name: "Dovle",
    type: "Departamento",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 20,
    name: "La Huerta Vista Alegre",
    type: "Lote",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },

  {
    id: 21,
    name: "+20 Viviendas Unifamiliares",
    type: "Casas",
    city: "Huancayo",
    address:
      "Proyecto entregado",
    status: "ENTREGADO",
  },
];

/* =========================================================
   DEPARTAMENTOS
========================================================= */

const DEPARTMENTS = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

/* =========================================================
   INICIALIZACIÓN
========================================================= */

const INITIAL_FORM: ComplaintFormData = {
  establishment: "",

  type: "",

  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  documentType: "DNI",
  documentNumber: "",

  department: "",
  province: "",
  district: "",
  address: "",

  isMinor: false,

  tutorFirstName: "",
  tutorLastName: "",
  tutorDocumentType: "DNI",
  tutorDocumentNumber: "",

  contractedType: "",

  project: "",

  building: "",
  unit: "",
  operationNumber: "",

  productDescription: "",

  detail: "",
  concreteRequest: "",

  notifyByEmail: true,

  acceptsSubmission: false,
};

/* =========================================================
   HELPERS
========================================================= */

function normalizeText(
  value: string
) {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

function getCurrentDate() {
  return new Intl.DateTimeFormat(
    "es-PE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(new Date());
}

function isAllowedFile(
  file: File
) {
  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() ?? "";

  return [
    "pdf",
    "ppt",
    "pptx",
    "doc",
    "docx",
    "jpg",
    "jpeg",
    "png",
  ].includes(extension);
}

/* =========================================================
   VALIDACIÓN
========================================================= */

function validateForm(
  data: ComplaintFormData
) {
  const errors: Record<
    string,
    string
  > = {};

  if (!data.establishment) {
    errors.establishment =
      "Selecciona el lugar donde ocurrieron los hechos.";
  }

  if (
    data.establishment ===
      "Oficina principal" &&
    !data.project
  ) {
    errors.project =
      "Selecciona el proyecto relacionado con el caso.";
  }

  if (!data.type) {
    errors.type =
      "Selecciona si deseas registrar un reclamo o una queja.";
  }

  if (!normalizeText(data.firstName)) {
    errors.firstName =
      "Ingresa tus nombres.";
  }

  if (!normalizeText(data.lastName)) {
    errors.lastName =
      "Ingresa tus apellidos.";
  }

  if (!normalizeText(data.email)) {
    errors.email =
      "Ingresa tu correo electrónico.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      data.email
    )
  ) {
    errors.email =
      "Ingresa un correo electrónico válido.";
  }

  if (!normalizeText(data.phone)) {
    errors.phone =
      "Ingresa tu teléfono o celular.";
  }

  if (
    !normalizeText(
      data.documentNumber
    )
  ) {
    errors.documentNumber =
      "Ingresa tu número de documento.";
  }

  if (!normalizeText(data.address)) {
    errors.address =
      "Ingresa tu dirección.";
  }

  if (data.isMinor) {
    if (
      !normalizeText(
        data.tutorFirstName
      )
    ) {
      errors.tutorFirstName =
        "Ingresa los nombres del tutor.";
    }

    if (
      !normalizeText(
        data.tutorLastName
      )
    ) {
      errors.tutorLastName =
        "Ingresa los apellidos del tutor.";
    }

    if (
      !normalizeText(
        data.tutorDocumentNumber
      )
    ) {
      errors.tutorDocumentNumber =
        "Ingresa el número de documento del tutor.";
    }
  }

  if (!data.contractedType) {
    errors.contractedType =
      "Selecciona producto o servicio.";
  }

  if (!data.project) {
    errors.project =
      "Selecciona el proyecto relacionado.";
  }

  if (
    !normalizeText(
      data.productDescription
    )
  ) {
    errors.productDescription =
      "Describe el producto o servicio.";
  }

  if (!normalizeText(data.detail)) {
    errors.detail =
      "Describe detalladamente los hechos.";
  }

  if (
    !normalizeText(
      data.concreteRequest
    )
  ) {
    errors.concreteRequest =
      "Indica el pedido concreto.";
  }

  if (!data.acceptsSubmission) {
    errors.acceptsSubmission =
      "Debes confirmar la información antes de enviar.";
  }

  return errors;
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function LibroReclamacionesForm() {
  const [form, setForm] =
    useState<ComplaintFormData>(
      INITIAL_FORM
    );

  const [attachments, setAttachments] =
    useState<Attachment[]>([]);

  const [errors, setErrors] =
    useState<Record<string, string>>(
      {}
    );

  const [serverError, setServerError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [result, setResult] =
    useState<ApiResponse | null>(null);

  const [submittedType, setSubmittedType] =
    useState<ComplaintType | "">("");

  const currentDate =
    useMemo(
      () => getCurrentDate(),
      []
    );

  /* =======================================================
     PROYECTO ACTUAL
  ======================================================= */

  const selectedProject =
    useMemo(
      () =>
        PROJECTS.find(
          (project) =>
            project.name ===
            form.project
        ),
      [form.project]
    );

  /* =======================================================
     ACTUALIZAR CAMPO
  ======================================================= */

  function updateField<
    K extends keyof ComplaintFormData
  >(
    field: K,
    value: ComplaintFormData[K]
  ) {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    setErrors(
      (previous) => {
        if (!previous[field]) {
          return previous;
        }

        const next = {
          ...previous,
        };

        delete next[field];

        return next;
      }
    );

    setServerError("");
  }

  /* =======================================================
     CAMBIO LUGAR DE LOS HECHOS
  ======================================================= */

  function handleEstablishmentChange(
    value: string
  ) {
    const selected =
      PROJECTS.find(
        (project) =>
          project.name === value
      );

    setForm(
      (previous) => ({
        ...previous,

        establishment: value,

        project:
          selected?.name ??
          previous.project,
      })
    );

    setErrors(
      (previous) => {
        const next = {
          ...previous,
        };

        delete next.establishment;

        if (
          selected?.name
        ) {
          delete next.project;
        }

        return next;
      }
    );
  }

  /* =======================================================
     CAMBIO PROYECTO
  ======================================================= */

  function handleProjectChange(
    value: string
  ) {
    setForm(
      (previous) => ({
        ...previous,
        project: value,
      })
    );

    setErrors(
      (previous) => {
        const next = {
          ...previous,
        };

        delete next.project;

        return next;
      }
    );

    setServerError("");
  }

  /* =======================================================
     ARCHIVOS
  ======================================================= */

  function handleFiles(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles =
      Array.from(
        event.target.files ?? []
      );

    if (!selectedFiles.length) {
      return;
    }

    const invalidFiles =
      selectedFiles.filter(
        (file) =>
          !isAllowedFile(file)
      );

    if (invalidFiles.length) {
      setServerError(
        "Solo se permiten archivos PDF, PPT, PPTX, Word, JPG, JPEG o PNG."
      );

      event.target.value = "";
      return;
    }

    const newAttachments =
      selectedFiles.map(
        (file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
          file,
        })
      );

    setAttachments(
      (previous) => [
        ...previous,
        ...newAttachments,
      ]
    );

    setServerError("");

    event.target.value = "";
  }

  function removeAttachment(
    id: string
  ) {
    setAttachments(
      (previous) =>
        previous.filter(
          (attachment) =>
            attachment.id !== id
        )
    );
  }

  /* =======================================================
     NORMALIZAR FORMULARIO
  ======================================================= */

  function normalizeForm(
    source: ComplaintFormData
  ): ComplaintFormData {
    return {
      ...source,

      establishment:
        normalizeText(
          source.establishment
        ),

      firstName:
        normalizeText(
          source.firstName
        ),

      lastName:
        normalizeText(
          source.lastName
        ),

      email:
        source.email
          .trim()
          .toLowerCase(),

      phone:
        source.phone
          .trim()
          .replace(
            /[^\d+\-\s()]/g,
            ""
          ),

      documentNumber:
        source.documentNumber
          .trim()
          .replace(
            /\s+/g,
            ""
          ),

      department:
        normalizeText(
          source.department
        ),

      province:
        normalizeText(
          source.province
        ),

      district:
        normalizeText(
          source.district
        ),

      address:
        normalizeText(
          source.address
        ),

      tutorFirstName:
        normalizeText(
          source.tutorFirstName
        ),

      tutorLastName:
        normalizeText(
          source.tutorLastName
        ),

      tutorDocumentNumber:
        source.tutorDocumentNumber
          .trim()
          .replace(
            /\s+/g,
            ""
          ),

      building:
        normalizeText(
          source.building
        ),

      unit:
        normalizeText(
          source.unit
        ),

      operationNumber:
        normalizeText(
          source.operationNumber
        ),

      productDescription:
        source.productDescription.trim(),

      detail:
        source.detail.trim(),

      concreteRequest:
        source.concreteRequest.trim(),
    };
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedForm =
      normalizeForm(form);

    const validationErrors =
      validateForm(
        normalizedForm
      );

    setForm(
      normalizedForm
    );

    setErrors(
      validationErrors
    );

    if (
      Object.keys(
        validationErrors
      ).length > 0
    ) {
      return;
    }

    void submitForm(
      normalizedForm
    );
  }

  /* =======================================================
     PAYLOAD
  ======================================================= */

  function buildPayload(
    data: ComplaintFormData
  ) {
    const selected =
      PROJECTS.find(
        (project) =>
          project.name ===
          data.project
      );

    return {
      /* -----------------------------------------------
         LUGAR DE LOS HECHOS
      ----------------------------------------------- */

      establecimiento:
        data.establishment,

      /* -----------------------------------------------
         TIPO
      ----------------------------------------------- */

      tipo:
        data.type,

      /* -----------------------------------------------
         CONSUMIDOR
      ----------------------------------------------- */

      nombres:
        data.firstName,

      apellidos:
        data.lastName,

      email:
        data.email,

      telefono:
        data.phone,

      tipo_documento:
        data.documentType,

      numero_documento:
        data.documentNumber,

      departamento:
        data.department,

      provincia:
        data.province,

      distrito:
        data.district,

      domicilio:
        data.address,

      /* -----------------------------------------------
         MENOR
      ----------------------------------------------- */

      es_menor:
        data.isMinor,

      tutor_nombres:
        data.tutorFirstName,

      tutor_apellidos:
        data.tutorLastName,

      tutor_tipo_documento:
        data.tutorDocumentType,

      tutor_numero_documento:
        data.tutorDocumentNumber,

      /* -----------------------------------------------
         BIEN CONTRATADO
      ----------------------------------------------- */

      tipo_bien:
        data.contractedType,

      /* -----------------------------------------------
         PROYECTO
      ----------------------------------------------- */

      proyecto:
        data.project,

      tipo_proyecto:
        selected?.type ?? null,

      estado_proyecto:
        selected?.status ?? null,

      ciudad_proyecto:
        selected?.city ?? null,

      direccion_proyecto:
        selected?.address ?? null,

      /* -----------------------------------------------
         TRAZABILIDAD INMOBILIARIA
      ----------------------------------------------- */

      edificio_torre_bloque:
        data.building,

      unidad_inmobiliaria:
        data.unit,

      numero_operacion:
        data.operationNumber,

      /* -----------------------------------------------
         DESCRIPCIÓN
      ----------------------------------------------- */

      descripcion_producto_servicio:
        data.productDescription,

      /*
       * Se conserva el campo en backend
       * para compatibilidad con la estructura
       * oficial, pero el usuario ya no lo
       * completa en la interfaz.
       */
      monto_reclamado:
        null,

      /* -----------------------------------------------
         DETALLE
      ----------------------------------------------- */

      detalle:
        data.detail,

      pedido:
        data.concreteRequest,

      /* -----------------------------------------------
         NOTIFICACIÓN
      ----------------------------------------------- */

      autoriza_notificacion_email:
        data.notifyByEmail,

      correo_notificacion:
        data.notifyByEmail
          ? data.email
          : null,

      /* -----------------------------------------------
         CONFORMIDAD
      ----------------------------------------------- */

      conformidad:
        data.acceptsSubmission,

      /* -----------------------------------------------
         CANAL
      ----------------------------------------------- */

      canal:
        "web",

      /*
       * Esta fecha es solo referencia
       * visual del frontend.
       *
       * La fecha oficial del registro
       * debe generarse en backend.
       */
      fecha_frontend:
        currentDate,
    };
  }

  /* =======================================================
     ENVIAR
  ======================================================= */

  async function submitForm(
  data: ComplaintFormData
) {
  setIsSubmitting(true);
  setServerError("");
  setResult(null);

  try {
    const payload = buildPayload(
      data
    );

    setSubmittedType(
      data.type
    );

    let response: Response;

    /*
     * ================================================
     * SIN ARCHIVOS
     * ================================================
     */

    if (
      attachments.length === 0
    ) {
      response =
        await fetch(
          "/api/reclamos",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            cache: "no-store",

            body:
              JSON.stringify(
                payload
              ),
          }
        );
    }

    /*
     * ================================================
     * CON ARCHIVOS
     * ================================================
     */

    else {
      const formData =
        new window.FormData();

      formData.append(
        "data",
        JSON.stringify(
          payload
        )
      );

      attachments.forEach(
        (attachment) => {
          formData.append(
            "adjuntos",
            attachment.file
          );
        }
      );

      response =
        await fetch(
          "/api/reclamos",
          {
            method: "POST",

            headers: {
              Accept:
                "application/json",
            },

            cache: "no-store",

            body: formData,
          }
        );
    }

    /* ================================================
       RESPUESTA API
    ================================================ */

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    let resultPayload: ApiResponse;

    if (
      contentType.includes(
        "application/json"
      )
    ) {
      resultPayload =
        (await response.json()) as ApiResponse;
    } else {
      resultPayload = {
        success: false,
        message:
          await response.text(),
      };
    }

    if (!response.ok) {
      throw new Error(
        resultPayload.message ||
          "No se pudo enviar el formulario."
      );
    }

    /*
     * Para esta prueba no necesitamos
     * ticket. El backend todavía solo
     * enviará el correo.
     */

    setResult({
      ...resultPayload,

      ticket:
        "ENVIADO POR CORREO",
    });

    setForm(
      INITIAL_FORM
    );

    setAttachments([]);
    setErrors({});
  } catch (error) {
    console.error(
      "[Libro de Reclamaciones]",
      error
    );

    setServerError(
      error instanceof Error
        ? error.message
        : "No se pudo enviar el formulario."
    );
  } finally {
    setIsSubmitting(false);
  }
}
  /* =======================================================
     PANTALLA DE CONFIRMACIÓN
  ======================================================= */

  if (result?.ticket) {
    const emailSent =
      result.email_status ===
        "sent" ||
      result.email_status ===
        "enviado" ||
      result.email_status ===
        "delivered" ||
      result.email_status ===
        "entregado";

    const emailFailed =
      result.email_status ===
        "failed" ||
      result.email_status ===
        "fallido";

    return (
      <section
        className={
          styles.confirmationPage
        }
      >
        <div
          className={
            styles.confirmationCard
          }
        >
          <div
            className={
              styles.confirmationIcon
            }
          >
            ✓
          </div>

          <span
            className={
              styles.confirmationLabel
            }
          >
            REGISTRO REALIZADO
          </span>

          <h1>
            Tu{" "}
            {submittedType ===
            "queja"
              ? "queja"
              : "reclamo"}{" "}
            fue registrado.
          </h1>

          <p
            className={
              styles.confirmationIntro
            }
          >
            Hemos recibido correctamente
            la información proporcionada.
            Conserva tu número de registro.
          </p>

          <div
            className={
              styles.ticket
            }
          >
            <span>
              N.° DE REGISTRO
            </span>

            <strong>
              {result.ticket}
            </strong>
          </div>

          <div
            className={
              emailFailed
                ? `${styles.confirmationEmail} ${styles.confirmationEmailError}`
                : styles.confirmationEmail
            }
          >
            <span>
              {emailFailed
                ? "!"
                : "✓"}
            </span>

            <div>
              <strong>
                {emailFailed
                  ? "No se pudo enviar la constancia"
                  : emailSent
                    ? "Constancia enviada"
                    : "Solicitud de constancia registrada"}
              </strong>

              <p>
                {emailFailed
                  ? "El registro fue realizado, pero el envío de la constancia presentó un inconveniente."
                  : emailSent
                    ? "La constancia fue enviada al correo electrónico consignado."
                    : "El sistema registró la solicitud de constancia y el estado será informado por el backend."}
              </p>
            </div>
          </div>

          {result.constancia_url && (
            <a
              href={
                result.constancia_url
              }
              target="_blank"
              rel="noreferrer"
              className={
                styles.confirmationButton
              }
            >
              VER CONSTANCIA
            </a>
          )}

          <button
            type="button"
            className={
              styles.newRecordButton
            }
            onClick={() => {
              setResult(null);
              setSubmittedType(
                ""
              );
            }}
          >
            REALIZAR OTRO REGISTRO
          </button>
        </div>
      </section>
    );
  }

  /* =======================================================
     FORMULARIO
  ======================================================= */

  return (
    <main
      className={
        styles.page
      }
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={
          styles.header
        }
      >
        <div
          className={
            styles.headerInner
          }
        >
          <div
            className={
              styles.headerMain
            }
          >
            <span
              className={
                styles.headerBrand
              }
            >
              ANCOSUR
            </span>

            <h1>
              Libro de
              <br />
              Reclamaciones
            </h1>

            <p>
              Conforme a lo establecido en
              el Código de Protección y
              Defensa del Consumidor,
              ponemos este libro a tu
              disposición.
            </p>
          </div>

          <div
            className={
              styles.headerMeta
            }
          >
            <div>
              <span>
                FECHA
              </span>

              <strong>
                {currentDate}
              </strong>
            </div>

            <div>
              <span>
                N.° DE HOJA
              </span>

              <strong>
                Se asignará al registrar
              </strong>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          FORMULARIO
      ====================================================== */}

      <section
        className={
          styles.formWrapper
        }
      >
        {/* ===================================================
            DATOS DEL PROVEEDOR
        ==================================================== */}

        <section
          className={
            styles.providerSummary
          }
        >
          <div>
            <span>
              PROVEEDOR
            </span>

            <strong>
              {PROVIDER.legalName}
            </strong>
          </div>

          <div>
            <span>
              RUC
            </span>

            <strong>
              {PROVIDER.ruc}
            </strong>
          </div>

          <div>
            <span>
              ESTABLECIMIENTO
            </span>

            <strong>
              {PROVIDER.address}
            </strong>
          </div>
        </section>

        {/* ===================================================
            00. LUGAR DE LOS HECHOS
        ==================================================== */}

        <section
          className={
            styles.locationSection
          }
        >
          <div
            className={
              styles.sectionHeading
            }
          >
            <span>
              00
            </span>

            <div>
              <h2>
                Antes de empezar
              </h2>

              <p>
                Indícanos el lugar en el
                que se dieron los hechos
                relacionados con la queja o
                reclamo.
              </p>
            </div>
          </div>

          <div
            className={
              styles.locationCard
            }
          >
            <label
              className={
                styles.field
              }
            >
              <span>
                LUGAR DE LOS HECHOS *
              </span>

              <select
                value={
                  form.establishment
                }
                onChange={(event) =>
                  handleEstablishmentChange(
                    event.target.value
                  )
                }
                aria-invalid={
                  !!errors.establishment
                }
              >
                <option value="">
                  Selecciona una opción
                </option>

                {PROJECTS.map(
                  (project) => (
                    <option
                      key={
                        project.id
                      }
                      value={
                        project.name
                      }
                    >
                      {project.name}
                    </option>
                  )
                )}

                <option value="Oficina principal">
                  Oficina principal
                </option>
              </select>

              {errors.establishment && (
                <small
                  className={
                    styles.error
                  }
                >
                  {
                    errors.establishment
                  }
                </small>
              )}
            </label>

            {selectedProject && (
              <div
                className={
                  styles.stageCard
                }
              >
                <div
                  className={
                    styles.stageMain
                  }
                >
                  <span>
                    ETAPA / ESTADO DEL PROYECTO
                  </span>

                  <strong>
                    {
                      selectedProject.status
                    }
                  </strong>
                </div>

                <div
                  className={
                    styles.stageProject
                  }
                >
                  <span>
                    PROYECTO
                  </span>

                  <strong>
                    {
                      selectedProject.name
                    }
                  </strong>
                </div>
              </div>
            )}

            {selectedProject?.status ===
              "ENTREGADO" && (
              <div
                className={
                  styles.deliveredNotice
                }
              >
                <strong>
                  Proyecto entregado
                </strong>

                <span>
                  Si la queja o reclamo se
                  relaciona con un proyecto
                  entregado, puedes seleccionar
                  "Oficina principal" para su
                  atención.
                </span>
              </div>
            )}

            {form.establishment ===
              "Oficina principal" && (
              <div
                className={
                  styles.officeProject
                }
              >
                <label
                  className={
                    styles.field
                  }
                >
                  <span>
                    PROYECTO RELACIONADO *
                  </span>

                  <select
                    value={
                      form.project
                    }
                    onChange={(event) =>
                      handleProjectChange(
                        event.target
                          .value
                      )
                    }
                    aria-invalid={
                      !!errors.project
                    }
                  >
                    <option value="">
                      Selecciona el proyecto
                    </option>

                    {PROJECTS.map(
                      (project) => (
                        <option
                          key={
                            project.id
                          }
                          value={
                            project.name
                          }
                        >
                          {
                            project.name
                          }
                        </option>
                      )
                    )}
                  </select>

                  {errors.project && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.project
                      }
                    </small>
                  )}
                </label>

                {selectedProject && (
                  <>
                    <div
                      className={
                        styles.stageCard
                      }
                    >
                      <div
                        className={
                          styles.stageMain
                        }
                      >
                        <span>
                          ETAPA / ESTADO
                        </span>

                        <strong>
                          {
                            selectedProject.status
                          }
                        </strong>
                      </div>

                      <div
                        className={
                          styles.stageProject
                        }
                      >
                        <span>
                          PROYECTO
                        </span>

                        <strong>
                          {
                            selectedProject.name
                          }
                        </strong>
                      </div>
                    </div>

                    {selectedProject.status ===
                      "ENTREGADO" && (
                      <div
                        className={
                          styles.deliveredNotice
                        }
                      >
                        <strong>
                          Proyecto entregado
                        </strong>

                        <span>
                          Si la queja o reclamo se
                          relaciona con un proyecto
                          entregado, puedes seleccionar
                          "Oficina principal" para su
                          atención.
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <form
          className={
            styles.form
          }
          onSubmit={
            handleSubmit
          }
          noValidate
        >
          {/* =================================================
              1. IDENTIFICACIÓN DEL CONSUMIDOR
          ================================================== */}

          <fieldset
            className={
              styles.block
            }
          >
            <legend>
              1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
            </legend>

            <div
              className={
                styles.grid
              }
            >
              <label
                className={
                  styles.field
                }
              >
                <span>
                  NOMBRES *
                </span>

                <input
                  type="text"
                  value={
                    form.firstName
                  }
                  onChange={(event) =>
                    updateField(
                      "firstName",
                      event.target.value
                    )
                  }
                  autoComplete="given-name"
                  maxLength={150}
                  aria-invalid={
                    !!errors.firstName
                  }
                />

                {errors.firstName && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.firstName}
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  APELLIDOS *
                </span>

                <input
                  type="text"
                  value={
                    form.lastName
                  }
                  onChange={(event) =>
                    updateField(
                      "lastName",
                      event.target.value
                    )
                  }
                  autoComplete="family-name"
                  maxLength={150}
                  aria-invalid={
                    !!errors.lastName
                  }
                />

                {errors.lastName && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.lastName}
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  CORREO ELECTRÓNICO *
                </span>

                <input
                  type="email"
                  value={
                    form.email
                  }
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  autoComplete="email"
                  maxLength={180}
                  aria-invalid={
                    !!errors.email
                  }
                />

                {errors.email && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.email}
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  TELÉFONO / CELULAR *
                </span>

                <input
                  type="tel"
                  value={
                    form.phone
                  }
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value
                    )
                  }
                  autoComplete="tel"
                  maxLength={30}
                  aria-invalid={
                    !!errors.phone
                  }
                />

                {errors.phone && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.phone}
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  TIPO DE DOCUMENTO *
                </span>

                <select
                  value={
                    form.documentType
                  }
                  onChange={(event) =>
                    updateField(
                      "documentType",
                      event.target
                        .value as DocumentType
                    )
                  }
                >
                  <option value="DNI">
                    DNI
                  </option>

                  <option value="PASAPORTE">
                    Pasaporte
                  </option>

                  <option value="CE">
                    C.E.
                  </option>
                </select>
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  N.° DE DOCUMENTO *
                </span>

                <input
                  type="text"
                  value={
                    form.documentNumber
                  }
                  onChange={(event) =>
                    updateField(
                      "documentNumber",
                      event.target.value
                    )
                  }
                  maxLength={30}
                  autoComplete="off"
                  aria-invalid={
                    !!errors.documentNumber
                  }
                />

                {errors.documentNumber && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.documentNumber
                    }
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  DEPARTAMENTO
                </span>

                <select
                  value={
                    form.department
                  }
                  onChange={(event) =>
                    updateField(
                      "department",
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Selecciona
                  </option>

                  {DEPARTMENTS.map(
                    (
                      department
                    ) => (
                      <option
                        key={
                          department
                        }
                        value={
                          department
                        }
                      >
                        {department}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  PROVINCIA
                </span>

                <input
                  type="text"
                  value={
                    form.province
                  }
                  onChange={(event) =>
                    updateField(
                      "province",
                      event.target.value
                    )
                  }
                  maxLength={100}
                />
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  DISTRITO
                </span>

                <input
                  type="text"
                  value={
                    form.district
                  }
                  onChange={(event) =>
                    updateField(
                      "district",
                      event.target.value
                    )
                  }
                  maxLength={100}
                />
              </label>

              <label
                className={`${styles.field} ${styles.full}`}
              >
                <span>
                  DIRECCIÓN *
                </span>

                <input
                  type="text"
                  value={
                    form.address
                  }
                  onChange={(event) =>
                    updateField(
                      "address",
                      event.target.value
                    )
                  }
                  autoComplete="street-address"
                  maxLength={250}
                  aria-invalid={
                    !!errors.address
                  }
                />

                {errors.address && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.address}
                  </small>
                )}
              </label>
            </div>

            <label
              className={
                styles.checkRow
              }
            >
              <input
                type="checkbox"
                checked={
                  form.isMinor
                }
                onChange={(event) =>
                  updateField(
                    "isMinor",
                    event.target.checked
                  )
                }
              />

              <span>
                El reclamante es menor de
                edad
              </span>
            </label>

            {form.isMinor && (
              <div
                className={
                  styles.tutorBox
                }
              >
                <div
                  className={
                    styles.innerTitle
                  }
                >
                  DATOS DEL TUTOR
                </div>

                <div
                  className={
                    styles.grid
                  }
                >
                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      NOMBRES DEL TUTOR *
                    </span>

                    <input
                      type="text"
                      value={
                        form.tutorFirstName
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "tutorFirstName",
                          event.target
                            .value
                        )
                      }
                      maxLength={150}
                    />

                    {
                      errors.tutorFirstName && (
                        <small
                          className={
                            styles.error
                          }
                        >
                          {
                            errors.tutorFirstName
                          }
                        </small>
                      )
                    }
                  </label>

                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      APELLIDOS DEL TUTOR *
                    </span>

                    <input
                      type="text"
                      value={
                        form.tutorLastName
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "tutorLastName",
                          event.target
                            .value
                        )
                      }
                      maxLength={150}
                    />

                    {
                      errors.tutorLastName && (
                        <small
                          className={
                            styles.error
                          }
                        >
                          {
                            errors.tutorLastName
                          }
                        </small>
                      )
                    }
                  </label>

                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      TIPO DE DOCUMENTO
                    </span>

                    <select
                      value={
                        form.tutorDocumentType
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "tutorDocumentType",
                          event.target
                            .value as DocumentType
                        )
                      }
                    >
                      <option value="DNI">
                        DNI
                      </option>

                      <option value="PASAPORTE">
                        Pasaporte
                      </option>

                      <option value="CE">
                        C.E.
                      </option>
                    </select>
                  </label>

                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      N.° DE DOCUMENTO *
                    </span>

                    <input
                      type="text"
                      value={
                        form.tutorDocumentNumber
                      }
                      onChange={(
                        event
                      ) =>
                        updateField(
                          "tutorDocumentNumber",
                          event.target
                            .value
                        )
                      }
                      maxLength={30}
                    />

                    {
                      errors.tutorDocumentNumber && (
                        <small
                          className={
                            styles.error
                          }
                        >
                          {
                            errors.tutorDocumentNumber
                          }
                        </small>
                      )
                    }
                  </label>
                </div>
              </div>
            )}
          </fieldset>

          {/* =================================================
              2. IDENTIFICACIÓN DEL BIEN
          ================================================== */}

          <fieldset
            className={
              styles.block
            }
          >
            <legend>
              2. IDENTIFICACIÓN DEL BIEN CONTRATADO
            </legend>

            <div
              className={
                styles.optionGroup
              }
            >
              <label
                className={
                  form.contractedType ===
                  "producto"
                    ? styles.optionActive
                    : styles.option
                }
              >
                <input
                  type="radio"
                  name="contractedType"
                  checked={
                    form.contractedType ===
                    "producto"
                  }
                  onChange={() =>
                    updateField(
                      "contractedType",
                      "producto"
                    )
                  }
                />

                <span>
                  PRODUCTO
                </span>
              </label>

              <label
                className={
                  form.contractedType ===
                  "servicio"
                    ? styles.optionActive
                    : styles.option
                }
              >
                <input
                  type="radio"
                  name="contractedType"
                  checked={
                    form.contractedType ===
                    "servicio"
                  }
                  onChange={() =>
                    updateField(
                      "contractedType",
                      "servicio"
                    )
                  }
                />

                <span>
                  SERVICIO
                </span>
              </label>
            </div>

            {errors.contractedType && (
              <small
                className={
                  styles.error
                }
              >
                {
                  errors.contractedType
                }
              </small>
            )}

            <div
              className={
                styles.grid
              }
            >
              <div
                className={`${styles.selectedProjectPanel} ${styles.full}`}
              >
                <div>
                  <span>
                    PROYECTO RELACIONADO
                  </span>

                  <strong>
                    {selectedProject?.name ||
                      "Selecciona el proyecto en la sección anterior"}
                  </strong>
                </div>

                <div>
                  <span>
                    TIPO
                  </span>

                  <strong>
                    {selectedProject?.type ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    ETAPA / ESTADO
                  </span>

                  <strong>
                    {selectedProject?.status ||
                      "—"}
                  </strong>
                </div>
              </div>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  EDIFICIO / TORRE / BLOQUE
                </span>

                <input
                  type="text"
                  value={
                    form.building
                  }
                  onChange={(event) =>
                    updateField(
                      "building",
                      event.target.value
                    )
                  }
                  maxLength={100}
                  placeholder="Ej.: Torre A"
                />
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  DEPARTAMENTO / LOTE / UNIDAD
                </span>

                <input
                  type="text"
                  value={
                    form.unit
                  }
                  onChange={(event) =>
                    updateField(
                      "unit",
                      event.target.value
                    )
                  }
                  maxLength={100}
                  placeholder="Ej.: Dpto. 504 / Lote 18"
                />
              </label>

              <label
                className={`${styles.field} ${styles.full}`}
              >
                <span>
                  N.° DE CONTRATO / SEPARACIÓN / OPERACIÓN
                </span>

                <input
                  type="text"
                  value={
                    form.operationNumber
                  }
                  onChange={(event) =>
                    updateField(
                      "operationNumber",
                      event.target.value
                    )
                  }
                  maxLength={100}
                  placeholder="Si corresponde"
                />
              </label>

              <label
                className={`${styles.field} ${styles.full}`}
              >
                <span>
                  DESCRIPCIÓN *
                </span>

                <textarea
                  rows={5}
                  maxLength={3000}
                  value={
                    form.productDescription
                  }
                  onChange={(event) =>
                    updateField(
                      "productDescription",
                      event.target.value
                    )
                  }
                  placeholder="Describe el producto o servicio relacionado con tu queja o reclamo."
                  aria-invalid={
                    !!errors.productDescription
                  }
                />

                <small
                  className={
                    styles.counter
                  }
                >
                  {
                    form
                      .productDescription
                      .length
                  }
                  / 3000
                </small>

                {
                  errors.productDescription && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.productDescription
                      }
                    </small>
                  )
                }
              </label>
            </div>
          </fieldset>

          {/* =================================================
              3. DETALLE
          ================================================== */}

          <fieldset
            className={
              styles.block
            }
          >
            <legend>
              3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR
            </legend>

            <div
              className={
                styles.explanation
              }
            >
              <div>
                <strong>
                  Reclamo
                </strong>

                <span>
                  Disconformidad relacionada
                  con el producto o servicio.
                </span>
              </div>

              <div>
                <strong>
                  Queja
                </strong>

                <span>
                  Malestar o descontento
                  respecto de la atención al
                  público.
                </span>
              </div>
            </div>

            <div
              className={
                styles.textStack
              }
            >
              <label
                className={
                  styles.field
                }
              >
                <span>
                  DETALLE *
                </span>

                <textarea
                  rows={8}
                  maxLength={5000}
                  value={
                    form.detail
                  }
                  onChange={(event) =>
                    updateField(
                      "detail",
                      event.target.value
                    )
                  }
                  placeholder="Describe claramente los hechos, fechas, comunicaciones y cualquier información que permita verificar lo ocurrido."
                  aria-invalid={
                    !!errors.detail
                  }
                />

                <small
                  className={
                    styles.counter
                  }
                >
                  {
                    form.detail
                      .length
                  }
                  / 5000
                </small>

                {errors.detail && (
                  <small
                    className={
                      styles.error
                    }
                  >
                    {errors.detail}
                  </small>
                )}
              </label>

              <label
                className={
                  styles.field
                }
              >
                <span>
                  PEDIDO *
                </span>

                <textarea
                  rows={6}
                  maxLength={3000}
                  value={
                    form.concreteRequest
                  }
                  onChange={(event) =>
                    updateField(
                      "concreteRequest",
                      event.target.value
                    )
                  }
                  placeholder="Indica de manera concreta qué solución, atención o respuesta solicitas."
                  aria-invalid={
                    !!errors.concreteRequest
                  }
                />

                <small
                  className={
                    styles.counter
                  }
                >
                  {
                    form
                      .concreteRequest
                      .length
                  }
                  / 3000
                </small>

                {
                  errors.concreteRequest && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        errors.concreteRequest
                      }
                    </small>
                  )
                }
              </label>
            </div>
          </fieldset>

          {/* =================================================
              ADJUNTOS
          ================================================== */}

          <fieldset
            className={
              styles.block
            }
          >
            <legend>
              DOCUMENTOS ADJUNTOS
            </legend>

            <div
              className={
                styles.uploadBox
              }
            >
              <label
                className={
                  styles.uploadButton
                }
              >
                <span>
                  ADJUNTAR ARCHIVO
                </span>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={
                    handleFiles
                  }
                />
              </label>

              <p>
                Formatos permitidos: PDF,
                PPT, PPTX, Word, JPG, JPEG
                y PNG.
              </p>
            </div>

            {attachments.length >
              0 && (
              <div
                className={
                  styles.attachments
                }
              >
                {attachments.map(
                  (
                    attachment
                  ) => (
                    <div
                      key={
                        attachment.id
                      }
                      className={
                        styles.attachment
                      }
                    >
                      <span>
                        {
                          attachment
                            .file
                            .name
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeAttachment(
                            attachment.id
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </fieldset>

          {/* =================================================
              4. PROVEEDOR
          ================================================== */}

          <fieldset
            className={
              styles.providerBlock
            }
          >
            <legend>
              4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR
            </legend>

            <div
              className={
                styles.providerNotice
              }
            >
              <span>
                i
              </span>

              <div>
                <strong>
                  Sección reservada a ANCOSUR
                </strong>

                <p>
                  Esta sección no será
                  completada por el consumidor.
                  Será utilizada por ANCOSUR
                  para registrar las
                  observaciones, acciones
                  adoptadas y respuesta
                  correspondiente.
                </p>

                <small>
                  El estado y la respuesta
                  deberán gestionarse desde
                  el sistema administrativo.
                </small>
              </div>
            </div>
          </fieldset>

          {/* =================================================
              5. CORREO
          ================================================== */}

          <fieldset
            className={
              styles.block
            }
          >
            <legend>
              5. ENVÍO DE CONSTANCIA Y NOTIFICACIÓN
            </legend>

            <div
              className={
                styles.emailAuthorization
              }
            >
              <div
                className={
                  styles.emailContent
                }
              >
                <span
                  className={
                    styles.emailLabel
                  }
                >
                  CORREO ELECTRÓNICO REGISTRADO
                </span>

                <strong>
                  {form.email ||
                    "Aún no has ingresado un correo"}
                </strong>

                <p>
                  ¿Deseas recibir una copia de
                  esta Hoja de Reclamación y las
                  comunicaciones relacionadas
                  con este registro en el correo
                  consignado?
                </p>
              </div>

              <div
                className={
                  styles.emailOptions
                }
              >
                <label
                  className={
                    form.notifyByEmail
                      ? styles.emailOptionActive
                      : styles.emailOption
                  }
                >
                  <input
                    type="radio"
                    name="notifyByEmail"
                    checked={
                      form.notifyByEmail
                    }
                    onChange={() =>
                      updateField(
                        "notifyByEmail",
                        true
                      )
                    }
                  />

                  <span>
                    SÍ
                  </span>
                </label>

                <label
                  className={
                    !form.notifyByEmail
                      ? styles.emailOptionActive
                      : styles.emailOption
                  }
                >
                  <input
                    type="radio"
                    name="notifyByEmail"
                    checked={
                      !form.notifyByEmail
                    }
                    onChange={() =>
                      updateField(
                        "notifyByEmail",
                        false
                      )
                    }
                  />

                  <span>
                    NO
                  </span>
                </label>
              </div>
            </div>

            <div
              className={
                form.notifyByEmail
                  ? styles.emailDecisionYes
                  : styles.emailDecisionNo
              }
            >
              {form.notifyByEmail
                ? "Sí. La constancia será enviada al correo consignado al registrar la solicitud."
                : "No. No se enviará la constancia por correo. La constancia deberá estar disponible al finalizar el registro."}
            </div>
          </fieldset>

          {/* =================================================
              CONFORMIDAD
          ================================================== */}

          <section
            className={
              styles.privacyBox
            }
          >
            <label
              className={
                styles.checkRow
            }
            >
              <input
                type="checkbox"
                checked={
                  form.acceptsSubmission
                }
                onChange={(event) =>
                  updateField(
                    "acceptsSubmission",
                    event.target
                      .checked
                  )
                }
                aria-invalid={
                  !!errors.acceptsSubmission
                }
              />

              <span>
                Declaro que la información
                consignada es verdadera y
                corresponde a los hechos que
                deseo comunicar a ANCOSUR.
              </span>
            </label>

            {errors.acceptsSubmission && (
              <small
                className={
                  styles.error
                }
              >
                {
                  errors.acceptsSubmission
                }
              </small>
            )}

            <p>
              (*) Campos obligatorios.
            </p>
          </section>

          {/* =================================================
              ERROR SERVIDOR
          ================================================== */}

          {serverError && (
            <div
              className={
                styles.serverError
              }
              role="alert"
            >
              {serverError}
            </div>
          )}

          {/* =================================================
              SUBMIT
          ================================================== */}

          <footer
            className={
              styles.submitArea
            }
          >
            <p>
              Una vez registrado el documento,
              se generará un número de registro
              para su seguimiento.
            </p>

            <button
              type="submit"
              className={
                styles.submitButton
              }
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? "REGISTRANDO..."
                : "ENVIAR DATOS"}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}