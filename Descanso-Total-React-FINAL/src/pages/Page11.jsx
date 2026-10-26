
import React, { useEffect, useState } from "react";

const HABITACIONES = {
  "Habitación Simple": "HAB001",
  "Habitación Doble": "HAB002",
  "Habitación Superior": "HAB003",
  "Suite Ejecutiva": "HAB004",
  "Suite Presidencial": "HAB005"
};

function obtenerHoy() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function calcularNoches(entrada, salida) {
  const inicio = new Date(entrada + "T12:00:00");
  const fin = new Date(salida + "T12:00:00");

  return Math.round((fin - inicio) / 86400000);
}

function dinero(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

export default function Page11() {
  const [codigo, setCodigo] = useState("");
  const [reserva, setReserva] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [resultado, setResultado] = useState("");
  const [errorResultado, setErrorResultado] = useState(false);
  const [puedeRegistrar, setPuedeRegistrar] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF09-Check-out y cobro-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  function buscarReserva(event) {
    event.preventDefault();

    setReserva(null);
    setMensaje("");
    setResultado("");
    setPuedeRegistrar(false);

    const codigoBuscado = codigo.trim().toUpperCase();

    if (!codigoBuscado) {
      setMensaje("Debes ingresar un código de reserva.");
      setError(true);
      return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const encontrada = reservas.find(
      (item) => item.codigo.toUpperCase() === codigoBuscado
    );

    if (!encontrada) {
      setMensaje("No se encontró una reserva con ese código.");
      setError(true);
      return;
    }

    setReserva(encontrada);

    if (encontrada.estado === "Check-out") {
      setMensaje("Esta reserva ya tiene el check-out registrado.");
      setError(true);
      return;
    }

    if (encontrada.estado !== "Check-in") {
      setMensaje("La reserva debe tener el check-in registrado.");
      setError(true);
      return;
    }

    if (obtenerHoy() < encontrada.salida) {
      setMensaje(
        `La fecha de salida es ${encontrada.salida}. Todavía no puedes registrar el check-out.`
      );
      setError(true);
      return;
    }

    setMensaje(
      "Reserva encontrada. Revisa el total antes de registrar el check-out."
    );
    setError(false);
    setPuedeRegistrar(true);
  }

  function registrarCheckout() {
    if (!reserva || !puedeRegistrar) return;

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const indice = reservas.findIndex(
      (item) => item.codigo === reserva.codigo
    );

    if (indice === -1) {
      setResultado("No se encontró la reserva.");
      setErrorResultado(true);
      setPuedeRegistrar(false);
      return;
    }

    const actual = reservas[indice];

    if (actual.estado !== "Check-in") {
      setResultado("La reserva no está disponible para check-out.");
      setErrorResultado(true);
      setPuedeRegistrar(false);
      setReserva(actual);
      return;
    }

    if (obtenerHoy() < actual.salida) {
      setResultado(
        "No puedes registrar el check-out antes de la fecha de salida."
      );
      setErrorResultado(true);
      setPuedeRegistrar(false);
      return;
    }

    const actualizada = {
      ...actual,
      estado: "Check-out"
    };

    reservas[indice] = actualizada;

    localStorage.setItem("reservas", JSON.stringify(reservas));

    const codigoHabitacion = HABITACIONES[actualizada.habitacion];

    if (codigoHabitacion) {
      const limpiezas =
        JSON.parse(localStorage.getItem("limpiezaHabitaciones")) || {};

      limpiezas[codigoHabitacion] = {
        persona: "",
        estado: "Pendiente"
      };

      localStorage.setItem(
        "limpiezaHabitaciones",
        JSON.stringify(limpiezas)
      );
    }

    setReserva(actualizada);
    setPuedeRegistrar(false);
    setMensaje("");
    setResultado(
      "Check-out registrado correctamente. Habitación pendiente de limpieza."
    );
    setErrorResultado(false);
  }

  const totalServicios = Number(reserva?.totalServicios) || 0;
  const total = Number(reserva?.total) || 0;
  const totalAlojamiento = total - totalServicios;

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

                <form
                  className="row g-3 align-items-end"
                  onSubmit={buscarReserva}
                >
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
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Buscar reserva
                    </button>
                  </div>
                </form>

                {mensaje && (
                  <p
                    className={
                      "mt-3 " +
                      (error ? "text-danger" : "text-success")
                    }
                    aria-live="polite"
                  >
                    {mensaje}
                  </p>
                )}
              </div>
            </div>
          </div>

          {reserva && (
            <div className="col-12 col-md-8">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">
                    Detalle del cobro
                  </h2>

                  <p>
                    <strong>Reserva:</strong> {reserva.codigo}
                  </p>

                  <p>
                    <strong>Huésped:</strong>{" "}
                    {reserva.nombre} {reserva.apellido}
                  </p>

                  <p>
                    <strong>Habitación:</strong> {reserva.habitacion}
                  </p>

                  <p>
                    <strong>Entrada:</strong> {reserva.entrada}
                  </p>

                  <p>
                    <strong>Salida:</strong> {reserva.salida}
                  </p>

                  <p>
                    <strong>Estado:</strong> {reserva.estado}
                  </p>

                  <hr />

                  <p>
                    <strong>Noches:</strong>{" "}
                    {calcularNoches(reserva.entrada, reserva.salida)}
                  </p>

                  <p>
                    <strong>Total alojamiento:</strong>{" "}
                    {dinero(totalAlojamiento)}
                  </p>

                  <p>
                    <strong>Servicios adicionales:</strong>{" "}
                    {dinero(totalServicios)}
                  </p>

                  <h3 className="h5 mt-4">
                    Total a pagar: {dinero(total)}
                  </h3>

                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={registrarCheckout}
                    disabled={!puedeRegistrar}
                  >
                    Registrar check-out
                  </button>

                  {resultado && (
                    <p
                      className={
                        "mt-3 mb-0 " +
                        (errorResultado
                          ? "text-danger"
                          : "text-success")
                      }
                      aria-live="polite"
                    >
                      {resultado}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
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
