import type { Metadata } from "next";

import LibroReclamacionesForm from "@/components/LibroReclamaciones/LibroReclamacionesForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | ANCOSUR Inmobiliaria",
  description:
    "Registra una queja o reclamo ante ANCOSUR Inmobiliaria.",
};

export default function LibroDeReclamacionesPage() {
  return (
    <main>
      <LibroReclamacionesForm />
    </main>
  );
}