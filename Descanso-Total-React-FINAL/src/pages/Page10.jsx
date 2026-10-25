
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

                <form className="row g-3">
                  <div className="col-12">
                    <label htmlFor="habitacion" className="form-label">
                      Habitación
                    </label>

                    <input
                      type="number"
                      id="habitacion"
                      name="habitacion"
                      className="form-control"
                      min="1"
                      placeholder="N° de habitación"
                    />
                  </div>
                </form>

                <p id="resultado" className="mt-2 mb-0"></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h5 card-title">Asignar persona</h2>

                <form className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="persona" className="form-label">
                      Persona asignada
                    </label>

                    <select
                      id="persona"
                      name="persona"
                      className="form-select"
                      defaultValue=""
                    >
                      <option value=""></option>
                      <option value="Benjamín Romero">
                        Benjamín Romero
                      </option>
                      <option value="Camila Castillo">
                        Camila Castillo
                      </option>
                      <option value="Rubén Espejo">
                        Rubén Espejo
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="button"
                      id="btnAsignar"
                      className="btn btn-primary"
                    >
                      Asignar
                    </button>
                  </div>
                </form>

                <p id="resultado2" className="mt-2 mb-0"></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h5 card-title">Estado habitación</h2>

                <p id="estado" className="fw-semibold">
                  Pendiente
                </p>

                <button
                  type="button"
                  id="btnCompletar"
                  className="btn btn-primary"
                  disabled={true}
                >
                  Marcar como completado
                </button>

                <p id="resultado3" className="mt-2 mb-0"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
