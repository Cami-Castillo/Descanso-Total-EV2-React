
import React, { useEffect } from "react";
import initialize from "../legacy/Page11";

export default function Page11() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF09-Check-out y cobro-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    initialize();

    return () => {
      link.remove();
    };
  }, []);

  return (
    <>
      <main className="container py-4">
        <h1>Check-out y cobros</h1>

        <p className="text-center">
          Consultar el cobro y registrar la salida del huésped
        </p>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">
                  Buscar reserva
                </h2>

                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label
                      htmlFor="codigoCheckout"
                      className="form-label"
                    >
                      Código de reserva
                    </label>

                    <input
                      type="text"
                      id="codigoCheckout"
                      className="form-control"
                      placeholder="Ej: DT-713120"
                    />
                  </div>

                  <div className="col-md-4">
                    <button
                      type="button"
                      id="btnBuscarCheckout"
                      className="btn btn-primary w-100"
                    >
                      Buscar reserva
                    </button>
                  </div>
                </div>

                <p
                  id="mensajeCheckout"
                  className="mt-3"
                  aria-live="polite"
                ></p>
              </div>
            </div>
          </div>

          <div
            id="detalleCheckout"
            className="col-12 col-md-8"
            style={{ display: "none" }}
          >
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title">
                  Detalle del cobro
                </h2>

                <p>
                  <strong>Reserva:</strong>{" "}
                  <span id="checkoutCodigo"></span>
                </p>

                <p>
                  <strong>Huésped:</strong>{" "}
                  <span id="checkoutHuesped"></span>
                </p>

                <p>
                  <strong>Habitación:</strong>{" "}
                  <span id="checkoutHabitacion"></span>
                </p>

                <p>
                  <strong>Entrada:</strong>{" "}
                  <span id="checkoutEntrada"></span>
                </p>

                <p>
                  <strong>Salida:</strong>{" "}
                  <span id="checkoutSalida"></span>
                </p>

                <p>
                  <strong>Estado:</strong>{" "}
                  <span id="checkoutEstado"></span>
                </p>

                <hr />

                <p>
                  <strong>Noches:</strong>{" "}
                  <span id="checkoutNoches"></span>
                </p>

                <p>
                  <strong>Total alojamiento:</strong>{" "}
                  <span id="checkoutAlojamiento"></span>
                </p>

                <p>
                  <strong>Servicios adicionales:</strong>{" "}
                  <span id="checkoutServicios"></span>
                </p>

                <h3 className="h5 mt-4">
                  Total a pagar:{" "}
                  <span id="checkoutTotal"></span>
                </h3>

                <button
                  type="button"
                  id="btnRegistrarCheckout"
                  className="btn btn-primary mt-3"
                  disabled
                >
                  Registrar check-out
                </button>

                <p
                  id="resultadoCheckout"
                  className="mt-3 mb-0"
                  aria-live="polite"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3">
        <p>
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
