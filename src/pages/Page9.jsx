
import React, { useEffect, useState } from "react";
import { HABITACIONES } from "../data/reservas";

function obtenerHoy() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

export default function Page9() {
  const [codigo, setCodigo] = useState("");
  const [reserva, setReserva] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF07-Check-in-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  function buscarReserva(event) {
    event.preventDefault();

    const reservas = JSON.parse(
      localStorage.getItem("reservas") || "[]"
    );

    const encontrada = reservas.find(
      (r) => r.codigo.toUpperCase() === codigo.trim().toUpperCase()
    );

    setReserva(null);

    if (!encontrada) {
      setMensaje("No se encontró la reserva.");
      setError(true);
      return;
    }

    setReserva(encontrada);
    setMensaje("Reserva encontrada.");
    setError(false);
  }

  function registrarCheckin() {
    if (!reserva) return;

    if (reserva.estado !== "Confirmada") {
      setMensaje("La reserva debe estar confirmada.");
      setError(true);
      return;
    }

    const hoy = obtenerHoy();

    if (hoy < reserva.entrada || hoy >= reserva.salida) {
      setMensaje("El check-in solo puede realizarse durante la estadía.");
      setError(true);
      return;
    }

    const habitacion = HABITACIONES.find(
      (h) => h.nombre === reserva.habitacion
    );

    if (!habitacion) {
      setMensaje("No se encontró la habitación.");
      setError(true);
      return;
    }

    const limpiezas = JSON.parse(
      localStorage.getItem("limpiezaHabitaciones") || "{}"
    );

    const limpieza = limpiezas[habitacion.codigo];

    if (
      limpieza?.estado === "Pendiente" ||
      limpieza?.estado === "En limpieza" ||
      (!limpieza && habitacion.estado !== "Disponible")
    ) {
      setMensaje("La habitación todavía no está lista.");
      setError(true);
      return;
    }

    const reservas = JSON.parse(
      localStorage.getItem("reservas") || "[]"
    );

    const actual = reservas.find(
      (r) => r.codigo === reserva.codigo
    );

    if (!actual || actual.estado !== "Confirmada") {
      setMensaje("La reserva ya no está disponible para check-in.");
      setError(true);
      return;
    }

    const actualizadas = reservas.map((r) =>
      r.codigo === reserva.codigo
        ? { ...r, estado: "Check-in" }
        : r
    );

    localStorage.setItem(
      "reservas",
      JSON.stringify(actualizadas)
    );

    setReserva({ ...actual, estado: "Check-in" });
    setMensaje("Check-in registrado correctamente.");
    setError(false);
  }

  return (
    <main className="container py-4">
      <h1>Check-in</h1>
      <p className="text-center">
        Validar la reserva y registrar el ingreso del huésped.
      </p>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: 650 }}>
        <div className="card-body">
          <h2 className="h5">Buscar reserva</h2>

          <form onSubmit={buscarReserva} className="row g-3">
            <div className="col-md-8">
              <label htmlFor="codigoCheckin" className="form-label">
                Código de reserva
              </label>
              <input
                id="codigoCheckin"
                className="form-control"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: DT-713120"
              />
            </div>

            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Buscar
              </button>
            </div>
          </form>

          {mensaje && (
            <p className={error ? "mt-3 text-danger" : "mt-3 text-success"}>
              {mensaje}
            </p>
          )}

          {reserva && (
            <div className="mt-4">
              <h2 className="h5">Detalle de la reserva</h2>

              <p><strong>Código:</strong> {reserva.codigo}</p>
              <p>
                <strong>Huésped:</strong> {reserva.nombre} {reserva.apellido}
              </p>
              <p><strong>Habitación:</strong> {reserva.habitacion}</p>
              <p><strong>Entrada:</strong> {reserva.entrada}</p>
              <p><strong>Salida:</strong> {reserva.salida}</p>
              <p><strong>Estado:</strong> {reserva.estado}</p>

              <button
                type="button"
                className="btn btn-success"
                onClick={registrarCheckin}
                disabled={reserva.estado !== "Confirmada"}
              >
                Registrar check-in
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
