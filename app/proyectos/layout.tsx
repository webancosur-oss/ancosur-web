import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/seo";

/* page.tsx es un componente cliente: la metadata vive aquí. */
export const metadata = createSeoMetadata({
  title: "Proyectos inmobiliarios en Huancayo",

  description:
    "Conoce todos los proyectos inmobiliarios de ANCOSUR en Huancayo y Junín: departamentos, lotes y resorts en preventa, en construcción y con entrega inmediata.",

  pathname: "/proyectos",

  keywords: [
    "proyectos inmobiliarios Huancayo",
    "proyectos Ancosur",
    "departamentos y lotes Huancayo",
    "inmobiliaria Huancayo",
    "inversión inmobiliaria Huancayo",
  ],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
