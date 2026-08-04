import SocioReferidoPage from "./SocioReferidoPage";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Socio Referido | ANCOSUR",
  description:
    "Únete al programa Socio Referido de ANCOSUR y gana beneficios recomendando nuevos clientes para nuestros proyectos inmobiliarios en Huancayo.",

  pathname: "/socio-referido",

  keywords: [
    "Socio Referido",
    "Socio Referido ANCOSUR",
    "Programa de referidos",
    "Referidos inmobiliarios",
    "Recomienda y gana",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
    "Huancayo",
    "Inmobiliaria Huancayo",
    "Departamentos Huancayo",
    "Lotes Huancayo",
  ],
});

export default function Page() {
  return <SocioReferidoPage />;
}