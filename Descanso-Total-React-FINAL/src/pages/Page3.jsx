
import React, { useEffect, useState } from "react";
import { HABITACIONES, disponible } from "../data/reservas";

export default function Page3() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState("");
  const [habitaciones, setHabitaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF01-Disponibilidad-estilos.css";
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  function buscarHabitaciones(event) {
    event.preventDefault();

    setHabitaciones([]);
    setMensaje("");
    setMostrarResultados(true);

    if (!entrada || !salida || !personas) {
      setMensaje(
        "Debes ingresar ambas fechas y la cantidad de personas."
      );
      return;
    }

    if (salida <= entrada) {
      setMensaje(
        "La fecha de salida debe ser posterior a la fecha de entrada."
      );
      return;
    }

    const cantidad = Number(personas);

    const disponibles = HABITACIONES.filter((habitacion) => {
      return (
        habitacion.capacidad >= cantidad &&
        disponible(habitacion, entrada, salida)
      );
    });

    setHabitaciones(disponibles);

    if (disponibles.length === 0) {
      setMensaje(
        "No existen habitaciones disponibles para las fechas y cantidad de personas seleccionadas."
      );
    } else {
      setMensaje(
        `Se encontraron ${disponibles.length} habitación(es) disponible(s).`
      );
    }
  }

  return (
    <>
      <main className="container py-4">
        <h1>Encuentra tu habitación</h1>

        <p>
          Selecciona las fechas de tu estadía y la cantidad de
          huéspedes para consultar las habitaciones disponibles
          en Hotel Descanso Total.
        </p>

        <form onSubmit={buscarHabitaciones}>
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
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
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
                value={salida}
                onChange={(e) => setSalida(e.target.value)}
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
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
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

        {mostrarResultados && (
          <section id="resultados" className="mt-5">
            <h2>Habitaciones disponibles</h2>

            <div id="listaHabitaciones" className="row g-4">
              {habitaciones.map((habitacion) => (
                <div className="col-md-4" key={habitacion.clave}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title">
                        {habitacion.nombre}
                      </h3>

                      <p>
                        <strong>Capacidad:</strong>{" "}
                        {habitacion.capacidad} huésped(es)
                      </p>

                      <p>
                        <strong>Precio por noche:</strong>{" "}
                        ${habitacion.precio.toLocaleString("es-CL")}
                      </p>

                      <p className="text-success">
                        Disponible para las fechas seleccionadas
                      </p>

                      <a
                        href={
                          "/rf02-registrar-reserva?" +
                          new URLSearchParams({
                            habitacion: habitacion.clave,
                            entrada: entrada,
                            salida: salida,
                            huespedes: personas
                          }).toString()
                        }
                        className="btn btn-primary"
                      >
                        Seleccionar habitación
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p id="mensajeSinResultados" className="mt-3">
              {mensaje}
            </p>
          </section>
        )}
      </main>

      <footer className="text-center py-4 mt-5 border-top">
        <p className="mb-0">
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
