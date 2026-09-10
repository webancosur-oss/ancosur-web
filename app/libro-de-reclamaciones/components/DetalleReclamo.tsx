"use client";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function DetalleReclamo({ form, setForm }: Props) {
  const update = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>3. Detalle de la solicitud</h2>

      <div className="typeSelector">
        <label>
          <input
            type="radio"
            name="tipo"
            checked={form.tipo === "reclamo"}
            onChange={() => update("tipo", "reclamo")}
          />
          Reclamo
        </label>

        <label>
          <input
            type="radio"
            name="tipo"
            checked={form.tipo === "queja"}
            onChange={() => update("tipo", "queja")}
          />
          Queja
        </label>
      </div>

      <div className="grid">
        <label className="full">
          Descripción del producto o servicio
          <input
            value={form.descripcion_producto_servicio}
            onChange={(e) =>
              update(
                "descripcion_producto_servicio",
                e.target.value
              )
            }
            placeholder="Describe brevemente el producto o servicio"
          />
        </label>

        <label className="full">
          Detalle del reclamo *
          <textarea
            rows={6}
            value={form.detalle}
            onChange={(e) =>
              update("detalle", e.target.value)
            }
            placeholder="Describe los hechos de manera clara y precisa"
          />
        </label>

        <label className="full">
          Pedido concreto *
          <textarea
            rows={4}
            value={form.pedido}
            onChange={(e) =>
              update("pedido", e.target.value)
            }
            placeholder="Indica qué solución solicitas"
          />
        </label>
      </div>
    </section>
  );
}