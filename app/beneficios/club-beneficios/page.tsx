import ClubBeneficiosPage from "./ClubBeneficiosPage";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Club de Beneficios ANCOSUR",
  description:
    "Descubre los beneficios, promociones y descuentos exclusivos para clientes ANCOSUR en Huancayo.",
  pathname: "/club-beneficios",

  keywords: [
    "Club de Beneficios ANCOSUR",
    "beneficios ANCOSUR",
    "descuentos ANCOSUR",
    "promociones ANCOSUR",
    "clientes ANCOSUR",
    "beneficios inmobiliarios",
    "Huancayo",
  ],
});

export default function Page() {
  return <ClubBeneficiosPage />;
}