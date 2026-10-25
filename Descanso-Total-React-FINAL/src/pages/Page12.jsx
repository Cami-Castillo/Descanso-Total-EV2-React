
import React, { useEffect } from "react";
import initialize from "../legacy/Page12";

export default function Page12() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF10-Reportes-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    initialize();

    return () => {
      link.remove();
    };
  }, []);

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
              <input type="date" id="desde" className="form-control" />
            </div>

            <div className="col-md-5">
              <label htmlFor="hasta" className="form-label">
                Hasta
              </label>
              <input type="date" id="hasta" className="form-control" />
            </div>

            <div className="col-md-2">
              <button
                type="button"
                id="btnGenerar"
                className="btn btn-primary w-100"
              >
                Generar
              </button>
            </div>
          </div>

          <p id="resultado" className="mt-3"></p>
        </div>
      </div>

      <section
        id="seccionReporte"
        className="mt-4"
        style={{ display: "none" }}
      >
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Total reservas</h3>
                <p id="reporteTotal" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Confirmadas</h3>
                <p id="reporteConfirmadas" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Con check-in</h3>
                <p id="reporteCheckin" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Solicitadas</h3>
                <p id="reporteSolicitadas" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Canceladas</h3>
                <p id="reporteCanceladas" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h3 className="h6">Con check-out</h3>
                <p id="reporteCheckout" className="fs-2 fw-bold">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h2 className="h5">Resumen de valores</h2>
            <p>
              <strong>Valor total de reservas activas:</strong>{" "}
              <span id="reporteIngresos">$0</span>
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

                <tbody id="tablaReportes"></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
