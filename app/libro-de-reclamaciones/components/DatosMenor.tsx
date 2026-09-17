"use client";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function DatosMenor({ form, setForm }: Props) {
  const update = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>4. Datos adicionales</h2>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.es_menor}
          onChange={(e) =>
            update("es_menor", e.target.checked)
          }
        />
        Soy menor de edad
      </label>

      {form.es_menor && (
        <div className="grid">
          <label>
            Nombres del tutor
            <input
              value={form.tutor_nombres}
              onChange={(e) =>
                update("tutor_nombres", e.target.value)
              }
            />
          </label>

          <label>
            Apellidos del tutor
            <input
              value={form.tutor_apellidos}
              onChange={(e) =>
                update("tutor_apellidos", e.target.value)
              }
            />
          </label>

          <label>
            Tipo de documento
            <select
              value={form.tutor_tipo_documento}
              onChange={(e) =>
                update(
                  "tutor_tipo_documento",
                  e.target.value
                )
              }
            >
              <option value="">Seleccionar</option>
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </label>

          <label>
            Número de documento
            <input
              value={form.tutor_numero_documento}
              onChange={(e) =>
                update(
                  "tutor_numero_documento",
                  e.target.value
                )
              }
            />
          </label>
        </div>
      )}
    </section>
  );
}