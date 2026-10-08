import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/seo";

/* page.tsx es un componente cliente: la metadata vive aquí. */
export const metadata = createSeoMetadata({
  title: "Departamentos en venta en Huancayo",

  description:
    "Departamentos en venta en Huancayo con ANCOSUR: proyectos Neo en preventa, en construcción y con entrega inmediata, con áreas comunes, financiamiento y asesoría personalizada.",

  pathname: "/departamentos",

  keywords: [
    "departamentos en Huancayo",
    "departamentos en venta Huancayo",
    "departamentos Huancayo preventa",
    "departamentos entrega inmediata Huancayo",
    "proyectos Neo Ancosur",
    "comprar departamento Huancayo",
  ],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
