import type { ReactNode } from "react";

import { createSeoMetadata } from "@/src/lib/seo";

export const metadata = createSeoMetadata({
  title: "Políticas | Ancosur Inmobiliaria",

  description:
    "Consulta las políticas corporativas, documentos del Sistema Integrado de Gestión, política de privacidad, términos y condiciones y política de cookies de Ancosur.",

  pathname: "/politicas",

  keywords: [
    "políticas Ancosur",
    "documentos corporativos Ancosur",
    "Sistema Integrado de Gestión Ancosur",
    "política de privacidad Ancosur",
    "términos y condiciones Ancosur",
    "política de cookies Ancosur",
    "documentación oficial Ancosur",
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