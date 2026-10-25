
import React, { useEffect } from "react";
import initialize from "../legacy/Page8";

export default function Page8() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF06-Gestionar reservas-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    initialize();

    return () => {
      link.remove();
    };
  }, []);

  return (
    <>
      <main className="container my-5">
        <h1>Gestión de reservas</h1>

        <p>
          Consulta las reservas del hotel y confirma las solicitudes
          que tengan disponibilidad.
        </p>

        <section className="row g-3 mt-4">
          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Solicitudes</h3>
                <p className="fs-2" id="totalSolicitadas">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Confirmadas</h3>
                <p className="fs-2" id="totalConfirmadas">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Total reservas</h3>
                <p className="fs-2" id="totalReservas">0</p>
              </div>
            </div>
          </div>
        </section>

        <section className="row g-3 mt-4">
          <div className="col-md-6">
            <label htmlFor="buscarCodigo" className="form-label">
              Buscar por código
            </label>
            <input
              type="text"
              id="buscarCodigo"
              className="form-control"
              placeholder="Ej: DT-1234"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="filtroEstado" className="form-label">
              Filtrar por estado
            </label>
            <select id="filtroEstado" className="form-select">
              <option value="Todos">Todos</option>
              <option value="Solicitada">Solicitada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Check-in">Check-in</option>
              <option value="Check-out">Check-out</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </section>

        <section className="mt-5">
          <h2>Reservas registradas</h2>

          <div className="table-responsive mt-3">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Huésped</th>
                  <th>Habitación</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody id="tablaReservas"></tbody>
            </table>
          </div>

          <p id="mensajeReservas" className="mt-3"></p>
        </section>
      </main>

      <footer className="text-center">
        <p>
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
