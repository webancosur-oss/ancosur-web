import SocioReferidoPage from "./SocioReferidoPage";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Socio Referido | Ancosur",
  description:
    "Únete al programa Socio Referido de Ancosur y gana beneficios recomendando nuevos clientes para nuestros proyectos inmobiliarios en Huancayo.",

  pathname: "/socio-referido",

  keywords: [
    "Socio Referido",
    "Socio Referido Ancosur",
    "Programa de referidos",
    "Referidos inmobiliarios",
    "Recomienda y gana",
    "Ancosur",
    "Ancosur Inmobiliaria",
    "Huancayo",
    "Inmobiliaria Huancayo",
    "Departamentos Huancayo",
    "Lotes Huancayo",
  ],
});

export default function Page() {
  return <SocioReferidoPage />;
}