import ClubBeneficiosPage from "./ClubBeneficiosPage";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Club de Beneficios Ancosur",
  description:
    "Descubre los beneficios, promociones y descuentos exclusivos para clientes Ancosur en Huancayo.",
  pathname: "/club-beneficios",

  keywords: [
    "Club de Beneficios Ancosur",
    "beneficios Ancosur",
    "descuentos Ancosur",
    "promociones Ancosur",
    "clientes Ancosur",
    "beneficios inmobiliarios",
    "Huancayo",
  ],
});

export default function Page() {
  return <ClubBeneficiosPage />;
}