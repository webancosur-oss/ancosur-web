import { projects } from "@/data/projects";
import { ORGANIZATION_ID } from "@/src/organization";
import { absoluteUrl } from "@/src/seo";

/* =========================================================
   DATOS ESTRUCTURADOS DE UN PROYECTO
   Toma los datos de @/data/projects (misma fuente que las
   tarjetas) para que Google y los buscadores con IA lean
   tipo, ubicación, metraje, precio y estado del proyecto.
========================================================= */

type ProjectJsonLdProps = {
  /* Nombre tal como aparece en data/projects.ts */
  name: string;
  /* Ruta de la página, p. ej. "/neo-balto" */
  path: string;
  /* Imagen 1200×630 de /og */
  image: string;
};

const CATEGORY = {
  Departamento: { label: "Departamentos", path: "/departamentos" },
  Lote: { label: "Lotes", path: "/lotes" },
  Casas: { label: "Proyectos", path: "/proyectos" },
  Resort: { label: "Resorts", path: "/resorts" },
} as const;

export default function ProjectJsonLd({
  name,
  path,
  image,
}: ProjectJsonLdProps) {
  const project = projects.find(
    (item) => item.name === name,
  );

  if (!project) return null;

  const url = absoluteUrl(path);
  const category = CATEGORY[project.type];

  /* "Todos Vendidos" o "Entregado" no son precios */
  const price = project.price.startsWith("S/")
    ? `desde ${project.price}`
    : project.price;

  const facts = [
    { name: "Estado", value: project.status },
    { name: "Área", value: project.area },
    { name: "Dormitorios", value: project.bedrooms },
    { name: "Precio", value: price },
  ].filter((fact) => fact.value);

  const place = {
    "@context": "https://schema.org",

    "@type":
      project.type === "Departamento"
        ? "ApartmentComplex"
        : "Place",

    "@id": `${url}#proyecto`,

    name: project.name,

    url,

    image: absoluteUrl(image),

    description: [
      `${category.label} ${project.name}`,
      project.area,
      project.city,
      project.status,
      price,
    ]
      .filter(Boolean)
      .join(" · "),

    address: {
      "@type": "PostalAddress",
      streetAddress: project.address,
      addressLocality: project.city,
      addressRegion: "Junín",
      addressCountry: "PE",
    },

    additionalProperty: facts.map((fact) => ({
      "@type": "PropertyValue",
      ...fact,
    })),

    subjectOf: {
      "@type": "WebPage",
      "@id": url,
      publisher: { "@id": ORGANIZATION_ID },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      { name: "Inicio", item: absoluteUrl("/") },
      { name: category.label, item: absoluteUrl(category.path) },
      { name: project.name, item: url },
    ].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...crumb,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([place, breadcrumb]).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
