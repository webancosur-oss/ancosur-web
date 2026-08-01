import type {
  Metadata,
} from "next";
import type {
  ReactNode,
} from "react";

export const metadata: Metadata = {
  title:
    "Políticas | ANCOSUR Inmobiliaria",

  description:
    "Consulta las políticas corporativas, documentos del Sistema Integrado de Gestión, política de privacidad, términos y condiciones y política de cookies de ANCOSUR.",

  alternates: {
    canonical: "/politicas",
  },
};

type PoliticasLayoutProps = {
  children: ReactNode;
};

export default function PoliticasLayout({
  children,
}: PoliticasLayoutProps) {
  return children;
}