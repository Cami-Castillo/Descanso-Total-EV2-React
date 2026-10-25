
import React, { useEffect } from "react";
import initialize from "../legacy/Page6";

export default function Page6() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF04-Servicios adicionales-estilos.css";
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
        <h1>Servicios adicionales</h1>

        <p>
          Ingresa el código de tu reserva para agregar servicios
          adicionales a tu estadía.
        </p>

        <section className="mt-4">
          <form id="formBuscarReserva">
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label htmlFor="codigoReserva" className="form-label">
                  Código de reserva
                </label>

                <input
                  type="text"
                  id="codigoReserva"
                  className="form-control"
                  placeholder="Ej: DT-1234"
                />
              </div>

              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  <i className="bi bi-search"></i>{" "}
                  Buscar reserva
                </button>
              </div>
            </div>
          </form>

          <p id="mensajeBusqueda" className="mt-3"></p>
        </section>

        <section
          id="seccionServicios"
          className="mt-5"
          style={{ display: "none" }}
        >
          <div className="card shadow-sm">
            <div className="card-body">
              <h2>
                Reserva <span id="codigoEncontrado"></span>
              </h2>

              <p>
                <strong>Huésped:</strong>{" "}
                <span id="nombreHuesped"></span>
              </p>

              <p>
                <strong>Habitación:</strong>{" "}
                <span id="habitacionReserva"></span>
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                <span id="estadoReserva"></span>
              </p>

              <h3 className="mt-4">Selecciona tus servicios</h3>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Servicio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Desayuno</td>
                      <td>
                        <select
                          className="form-select qty-select"
                          data-servicio="Desayuno"
                          data-price="25000"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </td>
                      <td className="subtotal">$0</td>
                    </tr>

                    <tr>
                      <td>Spa</td>
                      <td>
                        <select
                          className="form-select qty-select"
                          data-servicio="Spa"
                          data-price="15000"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </td>
                      <td className="subtotal">$0</td>
                    </tr>

                    <tr>
                      <td>Cena</td>
                      <td>
                        <select
                          className="form-select qty-select"
                          data-servicio="Cena"
                          data-price="35000"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </td>
                      <td className="subtotal">$0</td>
                    </tr>

                    <tr>
                      <td>Estacionamiento</td>
                      <td>
                        <select
                          className="form-select qty-select"
                          data-servicio="Estacionamiento"
                          data-price="15000"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </td>
                      <td className="subtotal">$0</td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan="2" className="text-end fw-bold">
                        Total servicios:
                      </td>
                      <td id="grand-total" className="fw-bold">
                        $0
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  id="btnAgregarServicios"
                  className="btn btn-primary"
                >
                  Agregar servicios
                </button>
              </div>

              <p id="mensajeServicios" className="mt-3"></p>
            </div>
          </div>
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
