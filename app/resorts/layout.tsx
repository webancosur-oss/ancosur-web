import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/seo";

/* page.tsx es un componente cliente: la metadata vive aquí. */
export const metadata = createSeoMetadata({
  title: "Resorts y lotes de descanso en la Selva Central",

  description:
    "Invierte en resorts y lotes de descanso con ANCOSUR, como Zagari Resort Club en San Ramón, Chanchamayo: naturaleza, amenidades y membresías exclusivas.",

  pathname: "/resorts",

  image: "/og/resorts.jpg",

  keywords: [
    "resort San Ramón",
    "Zagari Resort Club",
    "lotes de descanso Selva Central",
    "lotes en Chanchamayo",
    "resorts Ancosur",
  ],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
