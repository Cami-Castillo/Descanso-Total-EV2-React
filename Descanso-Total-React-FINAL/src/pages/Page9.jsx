
import React, { useEffect } from "react";
import initialize from "../legacy/Page9";

export default function Page9() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF07-Check-in-estilos.css";
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
        <h1>Check-in</h1>

        <p className="text-center">
          Validar reserva y habitación lista; registrar registro
        </p>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h5 card-title">Validar reserva</h2>

                <form className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="codigo" className="form-label">
                      Validar código
                    </label>

                    <input
                      type="text"
                      id="codigo"
                      name="codigo"
                      className="form-control"
                      placeholder="Código de reserva"
                    />
                  </div>

                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="button"
                      id="btnValidar"
                      className="btn btn-primary w-100"
                    >
                      OK
                    </button>
                  </div>
                </form>

                <p id="resultado" className="mt-2 mb-0"></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h5 card-title">Registrar check-in</h2>

                <form className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="registro" className="form-label">
                      Código de reserva
                    </label>

                    <input
                      type="text"
                      id="registro"
                      name="registro"
                      className="form-control"
                      placeholder="Código de reserva"
                    />
                  </div>

                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="button"
                      id="btnRegistrar"
                      className="btn btn-primary w-100"
                    >
                      OK
                    </button>
                  </div>
                </form>

                <p id="resultado2" className="mt-2 mb-0"></p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3">
        <p>© 2026 Hotel Descanso Total · Viña del Mar, Chile</p>
      </footer>
    </>
  );
}
