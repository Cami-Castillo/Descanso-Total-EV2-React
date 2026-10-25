
import React, { useEffect } from "react";
import initialize from "../legacy/Page3";

export default function Page3() {

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF01-Disponibilidad-estilos.css";
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

        <h1>Encuentra tu habitación</h1>

        <p>
          Selecciona las fechas de tu estadía y la cantidad de
          huéspedes para consultar las habitaciones disponibles
          en Hotel Descanso Total.
        </p>

        <form id="formDisponibilidad">

          <div className="row g-3">

            <div className="col-6">
              <label htmlFor="entrada" className="form-label">
                Entrada
              </label>

              <input
                type="date"
                id="entrada"
                name="entrada"
                className="form-control"
              />
            </div>

            <div className="col-6">
              <label htmlFor="salida" className="form-label">
                Salida
              </label>

              <input
                type="date"
                id="salida"
                name="salida"
                className="form-control"
              />
            </div>

          </div>

          <div className="row g-3 mt-3 align-items-end">

            <div className="col-6">
              <label htmlFor="personas" className="form-label">
                Número de personas
              </label>

              <select
                id="personas"
                name="personas"
                className="form-select"
                defaultValue=""
              >
                <option value="">Seleccionar...</option>
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5 personas</option>
              </select>
            </div>

            <div className="col-6">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>{" "}
                Buscar habitación
              </button>
            </div>

          </div>

        </form>

        <section id="resultados" className="mt-5">

          <h2>Habitaciones disponibles</h2>

          <div
            id="listaHabitaciones"
            className="row g-4"
          ></div>

          <p id="mensajeSinResultados"></p>

        </section>

      </main>

      <footer className="text-center py-4 mt-5 border-top">
        <p className="mb-0">
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
