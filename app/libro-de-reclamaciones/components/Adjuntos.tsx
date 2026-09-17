"use client";

interface Props {
  archivos: File[];
  setArchivos: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Adjuntos({
  archivos,
  setArchivos,
}: Props) {
  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    setArchivos(files);
  };

  return (
    <section>
      <h2>5. Documentos adjuntos</h2>

      <p className="hint">
        Puedes adjuntar documentos que ayuden a sustentar tu
        reclamo.
      </p>

      <input
        type="file"
        multiple
        accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFiles}
      />

      {archivos.length > 0 && (
        <ul className="fileList">
          {archivos.map((archivo) => (
            <li key={`${archivo.name}-${archivo.size}`}>
              {archivo.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}