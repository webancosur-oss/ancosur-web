"use client";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function DatosPersonales({ form, setForm }: Props) {
  const update = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <h2>1. Datos personales</h2>

      <div className="grid">
        <label>
          Nombres *
          <input
            value={form.nombres}
            onChange={(e) => update("nombres", e.target.value)}
            placeholder="Ingresa tus nombres"
          />
        </label>

        <label>
          Apellidos *
          <input
            value={form.apellidos}
            onChange={(e) => update("apellidos", e.target.value)}
            placeholder="Ingresa tus apellidos"
          />
        </label>

        <label>
          Tipo de documento *
          <select
            value={form.tipo_documento}
            onChange={(e) =>
              update("tipo_documento", e.target.value)
            }
          >
            <option value="">Seleccionar</option>
            <option value="DNI">DNI</option>
            <option value="CE">Carné de extranjería</option>
            <option value="PASAPORTE">Pasaporte</option>
          </select>
        </label>

        <label>
          Número de documento *
          <input
            value={form.numero_documento}
            onChange={(e) =>
              update("numero_documento", e.target.value)
            }
            placeholder="Número de documento"
          />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </label>

        <label>
          Teléfono
          <input
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder="999 999 999"
          />
        </label>

        <label className="full">
          Domicilio
          <input
            value={form.domicilio}
            onChange={(e) => update("domicilio", e.target.value)}
            placeholder="Dirección"
          />
        </label>
      </div>
    </section>
  );
}