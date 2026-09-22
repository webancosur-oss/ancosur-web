"use client";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function DatosInmueble({ form, setForm }: Props) {
  const update = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>2. Datos del producto o servicio</h2>

      <div className="grid">
        <label>
          Tipo de bien
          <select
            value={form.tipo_bien}
            onChange={(e) =>
              update("tipo_bien", e.target.value)
            }
          >
            <option value="">Seleccionar</option>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="lote">Lote</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Proyecto *
          <input
            value={form.proyecto}
            onChange={(e) => update("proyecto", e.target.value)}
            placeholder="Nombre del proyecto"
          />
        </label>

        <label>
          Tipo de proyecto
          <input
            value={form.tipo_proyecto}
            onChange={(e) =>
              update("tipo_proyecto", e.target.value)
            }
            placeholder="Ej. Departamento"
          />
        </label>

        <label>
          Estado del proyecto
          <input
            value={form.estado_proyecto}
            onChange={(e) =>
              update("estado_proyecto", e.target.value)
            }
            placeholder="Estado"
          />
        </label>

        <label>
          Ciudad del proyecto
          <input
            value={form.ciudad_proyecto}
            onChange={(e) =>
              update("ciudad_proyecto", e.target.value)
            }
            placeholder="Ciudad"
          />
        </label>

        <label>
          Dirección del proyecto
          <input
            value={form.direccion_proyecto}
            onChange={(e) =>
              update("direccion_proyecto", e.target.value)
            }
            placeholder="Dirección"
          />
        </label>

        <label>
          Edificio / Torre / Bloque
          <input
            value={form.edificio_torre_bloque}
            onChange={(e) =>
              update("edificio_torre_bloque", e.target.value)
            }
          />
        </label>

        <label>
          Unidad inmobiliaria
          <input
            value={form.unidad_inmobiliaria}
            onChange={(e) =>
              update("unidad_inmobiliaria", e.target.value)
            }
          />
        </label>

        <label>
          N.º de operación
          <input
            value={form.numero_operacion}
            onChange={(e) =>
              update("numero_operacion", e.target.value)
            }
          />
        </label>

        <label>
          Monto reclamado
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.monto_reclamado}
            onChange={(e) =>
              update(
                "monto_reclamado",
                Number(e.target.value) || 0
              )
            }
          />
        </label>
      </div>
    </section>
  );
}