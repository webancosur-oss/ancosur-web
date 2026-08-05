import { redirect } from "next/navigation";

import { createSeoMetadata } from "@/src/lib/seo";

import { transparencyProjects } from "./data";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Portal de Transparencia | Ancosur Inmobiliaria",

  description:
    "Consulta la información legal, técnica y comercial de los proyectos inmobiliarios desarrollados por Ancosur.",

  pathname: "/portal-de-transparencia",

  keywords: [
    "Portal de Transparencia",
    "Transparencia Ancosur",
    "documentos inmobiliarios",
    "proyectos Ancosur",
    "información legal inmobiliaria",
    "información técnica inmobiliaria",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   REDIRECCIÓN
========================================================= */

export default function PortalTransparenciaPage() {
  const firstProject = transparencyProjects[0];

  if (!firstProject) {
    redirect("/");
  }

  redirect(
    `/portal-de-transparencia/${firstProject.slug}`,
  );
}