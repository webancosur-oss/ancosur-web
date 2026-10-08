import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/seo";

/* page.tsx es un componente cliente: la metadata vive aquí. */
export const metadata = createSeoMetadata({
  title: "Lotes en venta en Huancayo y Junín",

  description:
    "Lotes en venta en Huancayo, El Tambo y Concepción con ANCOSUR: lotes con título de propiedad, habilitación urbana, entrega inmediata y facilidades de pago.",

  pathname: "/lotes",

  keywords: [
    "lotes en Huancayo",
    "lotes en venta Huancayo",
    "terrenos en Huancayo",
    "lotes en El Tambo",
    "lotes en Concepción",
    "lotes con título de propiedad",
  ],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
