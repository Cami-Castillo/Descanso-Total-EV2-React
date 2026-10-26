
import React, { useState } from "react";
import EstadoReserva from "../components/EstadoReserva";
import {
  buscarReserva,
  cancelarReserva
} from "../data/reservas";

export default function Page7() {
  const [codigo, setCodigo] = useState("");
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState("");

  function consultar(e) {
    e.preventDefault();

    const r = buscarReserva(codigo);

    setReserva(r);
    setError(r ? "" : "No se encontró la reserva.");
  }

  function cancelar() {
    try {
      setReserva(cancelarReserva(reserva.codigo));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="container py-4">
      <h1>Cancelar reserva</h1>

      <form onSubmit={consultar} className="row g-2">
        <div className="col-md-8">
          <label htmlFor="buscarCancelar" className="form-label">
            Código de reserva
          </label>

          <input
            id="buscarCancelar"
            value={codigo}
            className="form-control"
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="DT-123456"
          />
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary w-100">
            Buscar reserva
          </button>
        </div>
      </form>

      {error && (
        <div role="alert" className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      <EstadoReserva reserva={reserva} />

      {reserva &&
        !["Cancelada", "Check-in", "Check-out"].includes(reserva.estado) && (
          <button
            className="btn btn-danger mt-3"
            onClick={cancelar}
          >
            Confirmar cancelación
          </button>
        )}

      {reserva?.estado === "Cancelada" && (
        <p className="alert alert-success mt-3">
          La reserva está cancelada.
        </p>
      )}
    </main>
  );
}
