
import React, { useEffect, useState } from "react";

function dinero(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

function contarPorEstado(reservas, estado) {
  return reservas.filter(
    (reserva) => reserva.estado === estado
  ).length;
}

export default function Page12() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [reservas, setReservas] = useState([]);
  const [mostrarReporte, setMostrarReporte] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF10-Reportes-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  function generarReporte() {
    setMensaje("");
    setMostrarReporte(false);
    setReservas([]);

    if (!desde || !hasta) {
      setMensaje("Debes seleccionar ambas fechas.");
      setEsError(true);
      return;
    }

    if (hasta < desde) {
      setMensaje("La fecha final no puede ser anterior a la inicial.");
      setEsError(true);
      return;
    }

    const todas =
      JSON.parse(localStorage.getItem("reservas")) || [];

    const filtradas = todas.filter(
      (reserva) =>
        reserva.entrada >= desde && reserva.entrada <= hasta
    );

    setReservas(filtradas);
    setMostrarReporte(true);
    setEsError(false);
    setMensaje(
      "Reporte generado correctamente. Se incluyen reservas cuya fecha de entrada está dentro del período."
    );
  }

  const activas = reservas.filter(
    (reserva) => reserva.estado !== "Cancelada"
  );

  const ingresos = activas.reduce(
    (total, reserva) => total + Number(reserva.total || 0),
    0
  );

  return (
    <main className="container py-4">
      <h1>Reportes</h1>

      <p className="text-center">
        Consulta las reservas según el período seleccionado
      </p>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="h5">Generar reporte</h2>

          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label htmlFor="desde" className="form-label">
                Desde
              </label>

              <input
                type="date"
                id="desde"
                className="form-control"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="hasta" className="form-label">
                Hasta
              </label>

              <input
                type="date"
                id="hasta"
                className="form-control"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={generarReporte}
              >
                Generar
              </button>
            </div>
          </div>

          {mensaje && (
            <p
              className={
                "mt-3 " +
                (esError ? "text-danger" : "text-success")
              }
              role="status"
            >
              {mensaje}
            </p>
          )}
        </div>
      </div>

      {mostrarReporte && (
        <section className="mt-4">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Total reservas</h3>
                  <p className="fs-2 fw-bold">{reservas.length}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Confirmadas</h3>
                  <p className="fs-2 fw-bold">
                    {contarPorEstado(reservas, "Confirmada")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Con check-in</h3>
                  <p className="fs-2 fw-bold">
                    {contarPorEstado(reservas, "Check-in")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Solicitadas</h3>
                  <p className="fs-2 fw-bold">
                    {contarPorEstado(reservas, "Solicitada")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Canceladas</h3>
                  <p className="fs-2 fw-bold">
                    {contarPorEstado(reservas, "Cancelada")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h3 className="h6">Con check-out</h3>
                  <p className="fs-2 fw-bold">
                    {contarPorEstado(reservas, "Check-out")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-body">
              <h2 className="h5">Resumen de valores</h2>

              <p>
                <strong>Valor total de reservas activas:</strong>{" "}
                {dinero(ingresos)}
              </p>

              <p className="text-muted">
                Este valor no representa pagos efectivamente recibidos.
              </p>
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-body">
              <h2 className="h5">Detalle de reservas</h2>

              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Huésped</th>
                      <th>Habitación</th>
                      <th>Entrada</th>
                      <th>Salida</th>
                      <th>Estado</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservas.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center text-muted"
                        >
                          No existen reservas para este período.
                        </td>
                      </tr>
                    ) : (
                      reservas.map((reserva) => (
                        <tr key={reserva.codigo}>
                          <td>{reserva.codigo}</td>
                          <td>
                            {reserva.nombre} {reserva.apellido}
                          </td>
                          <td>{reserva.habitacion}</td>
                          <td>{reserva.entrada}</td>
                          <td>{reserva.salida}</td>
                          <td>{reserva.estado}</td>
                          <td>{dinero(reserva.total || 0)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
