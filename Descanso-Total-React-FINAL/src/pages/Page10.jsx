
import React, { useEffect, useState } from "react";

const HABITACIONES = {
  HAB001: "Habitación Simple",
  HAB002: "Habitación Doble",
  HAB003: "Habitación Superior",
  HAB004: "Suite Ejecutiva",
  HAB005: "Suite Presidencial"
};

const PERSONAS = [
  "Benjamín Romero",
  "Camila Castillo",
  "Rubén Espejo"
];

export default function Page10() {
  const [habitacion, setHabitacion] = useState("");
  const [persona, setPersona] = useState("");

  const [limpiezas, setLimpiezas] = useState(() => {
    return JSON.parse(localStorage.getItem("limpiezaHabitaciones")) || {};
  });

  const [mensajeAsignacion, setMensajeAsignacion] = useState("");
  const [errorAsignacion, setErrorAsignacion] = useState(false);
  const [mensajeCompletar, setMensajeCompletar] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF08-Gestionar limpieza-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  const limpiezaActual = limpiezas[habitacion];

  const estado = !habitacion
    ? "Selecciona una habitación"
    : limpiezaActual?.estado || "Pendiente";

  const puedeCompletar = limpiezaActual?.estado === "En limpieza";

  function seleccionarHabitacion(codigo) {
    setHabitacion(codigo);
    setPersona(limpiezas[codigo]?.persona || "");
    setMensajeAsignacion("");
    setMensajeCompletar("");
  }

  function asignarLimpieza() {
    setMensajeCompletar("");

    if (!habitacion || !persona) {
      setMensajeAsignacion(
        "Debes seleccionar una habitación y una persona."
      );
      setErrorAsignacion(true);
      return;
    }

    const actualizadas = {
      ...limpiezas,
      [habitacion]: {
        persona: persona,
        estado: "En limpieza"
      }
    };

    localStorage.setItem(
      "limpiezaHabitaciones",
      JSON.stringify(actualizadas)
    );

    setLimpiezas(actualizadas);
    setMensajeAsignacion(
      `${persona} asignado/a correctamente a ${habitacion}.`
    );
    setErrorAsignacion(false);
  }

  function completarLimpieza() {
    if (!puedeCompletar) return;

    const actualizadas = {
      ...limpiezas,
      [habitacion]: {
        ...limpiezaActual,
        estado: "Completada"
      }
    };

    localStorage.setItem(
      "limpiezaHabitaciones",
      JSON.stringify(actualizadas)
    );

    setLimpiezas(actualizadas);
    setMensajeCompletar(
      `Limpieza de ${habitacion} completada correctamente.`
    );
  }

  return (
    <main className="container py-4">
      <h1>Limpieza</h1>

      <p className="text-center">
        Asignar limpieza y actualizar el estado de la habitación
      </p>

      <div className="row justify-content-center g-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 card-title">Habitación</h2>

              <label htmlFor="habitacion" className="form-label">
                Seleccionar habitación
              </label>

              <select
                id="habitacion"
                className="form-select"
                value={habitacion}
                onChange={(e) =>
                  seleccionarHabitacion(e.target.value)
                }
              >
                <option value="">Selecciona una habitación</option>

                {Object.entries(HABITACIONES).map(([codigo, nombre]) => (
                  <option key={codigo} value={codigo}>
                    {codigo} - {nombre}
                  </option>
                ))}
              </select>

              {habitacion && (
                <p className="mt-3 mb-0 text-success">
                  {habitacion} - {HABITACIONES[habitacion]}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 card-title">Asignar persona</h2>

              <label htmlFor="persona" className="form-label">
                Persona asignada
              </label>

              <select
                id="persona"
                className="form-select"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
              >
                <option value="">Selecciona una persona</option>

                {PERSONAS.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={asignarLimpieza}
              >
                Asignar
              </button>

              {mensajeAsignacion && (
                <p
                  className={
                    "mt-3 mb-0 " +
                    (errorAsignacion ? "text-danger" : "text-success")
                  }
                >
                  {mensajeAsignacion}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 card-title">Estado de limpieza</h2>

              <p className="fw-semibold">{estado}</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={completarLimpieza}
                disabled={!puedeCompletar}
              >
                Marcar como completado
              </button>

              {mensajeCompletar && (
                <p className="mt-3 mb-0 text-success">
                  {mensajeCompletar}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
