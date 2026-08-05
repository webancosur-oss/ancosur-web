import CompramosTerrenoPage from "./CompramosTerrenoPage";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Compramos tu Terreno | Ancosur",
  description:
    "Vende tu terreno de forma rápida, segura y transparente con Ancosur. Evaluamos terrenos para nuevos proyectos inmobiliarios en Huancayo y otras ciudades.",

  pathname: "/compramos-tu-terreno",

  keywords: [
    "compramos terrenos",
    "compramos tu terreno",
    "vender terreno",
    "venta de terrenos",
    "terrenos Huancayo",
    "comprar terreno Huancayo",
    "inmobiliaria Huancayo",
    "Ancosur",
    "Ancosur Inmobiliaria",
  ],
});

export default function Page() {
  return <CompramosTerrenoPage />;
}