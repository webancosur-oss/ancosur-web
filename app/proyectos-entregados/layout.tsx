import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/seo";

/* page.tsx es un componente cliente: la metadata vive aquí. */
export const metadata = createSeoMetadata({
  title: "Proyectos entregados",

  description:
    "Más de 10 años construyendo en Huancayo: conoce los proyectos inmobiliarios que ANCOSUR ya entregó en Huancayo y Junín.",

  pathname: "/proyectos-entregados",

  keywords: [
    "proyectos entregados Ancosur",
    "experiencia inmobiliaria Huancayo",
    "obras entregadas Huancayo",
    "Ancosur trayectoria",
  ],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
