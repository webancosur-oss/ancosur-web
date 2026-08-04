import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Políticas | ANCOSUR Inmobiliaria",

  description:
    "Consulta las políticas corporativas, documentos del Sistema Integrado de Gestión, política de privacidad, términos y condiciones y política de cookies de ANCOSUR.",

  pathname: "/politicas",

  keywords: [
    "políticas ANCOSUR",
    "documentos corporativos ANCOSUR",
    "Sistema Integrado de Gestión ANCOSUR",
    "política de privacidad ANCOSUR",
    "términos y condiciones ANCOSUR",
    "política de cookies ANCOSUR",
    "documentación oficial ANCOSUR",
  ],

  image: "/opengraph-image.png",
});

type PoliticasLayoutProps = {
  children: ReactNode;
};

export default function PoliticasLayout({
  children,
}: PoliticasLayoutProps) {
  return children;
}