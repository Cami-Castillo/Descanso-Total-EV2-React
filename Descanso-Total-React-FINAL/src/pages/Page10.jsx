
import React, { useEffect } from "react";
import initialize from "../legacy/Page10";

export default function Page10() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF08-Gestionar limpieza-estilos.css";
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
                  defaultValue=""
                >
                  <option value="">Selecciona una habitación</option>
                  <option value="HAB001">HAB001 - Habitación Simple</option>
                  <option value="HAB002">HAB002 - Habitación Doble</option>
                  <option value="HAB003">HAB003 - Habitación Superior</option>
                  <option value="HAB004">HAB004 - Suite Ejecutiva</option>
                  <option value="HAB005">HAB005 - Suite Presidencial</option>
                </select>

                <p id="resultado" className="mt-3 mb-0"></p>
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
                  defaultValue=""
                >
                  <option value="">Selecciona una persona</option>
                  <option value="Benjamín Romero">Benjamín Romero</option>
                  <option value="Camila Castillo">Camila Castillo</option>
                  <option value="Rubén Espejo">Rubén Espejo</option>
                </select>

                <button
                  type="button"
                  id="btnAsignar"
                  className="btn btn-primary mt-3"
                >
                  Asignar
                </button>

                <p id="resultado2" className="mt-3 mb-0"></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h5 card-title">Estado de limpieza</h2>

                <p id="estado" className="fw-semibold">
                  Selecciona una habitación
                </p>

                <button
                  type="button"
                  id="btnCompletar"
                  className="btn btn-primary"
                  disabled
                >
                  Marcar como completado
                </button>

                <p id="resultado3" className="mt-3 mb-0"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
