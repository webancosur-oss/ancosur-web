import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { transparencyProjects } from "./data";

export const metadata: Metadata = {
  title: "Portal de Transparencia | ANCOSUR Inmobiliaria",

  description:
    "Consulta la información legal, técnica y comercial de los proyectos inmobiliarios de ANCOSUR.",

  alternates: {
    canonical: "/portal-de-transparencia",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PortalTransparenciaPage() {
  const firstProject = transparencyProjects[0];

  if (!firstProject) {
    redirect("/");
  }

  redirect(
    `/portal-de-transparencia/${firstProject.slug}`
  );
}