
import React, { useEffect, useState } from "react";

const SERVICIOS = [
  { nombre: "Desayuno", precio: 12000 },
  { nombre: "Spa", precio: 25000 },
  { nombre: "Cena", precio: 20000 },
  { nombre: "Estacionamiento", precio: 10000 }
];

const moneda = (valor) => "$" + valor.toLocaleString("es-CL");

export default function Page6() {
  const [codigo, setCodigo] = useState("");
  const [reserva, setReserva] = useState(null);
  const [cantidades, setCantidades] = useState({});
  const [mensajeBusqueda, setMensajeBusqueda] = useState("");
  const [errorBusqueda, setErrorBusqueda] = useState(false);
  const [mensajeServicios, setMensajeServicios] = useState("");
  const [errorServicios, setErrorServicios] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF04-Servicios adicionales-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  const totalServicios = SERVICIOS.reduce((total, servicio) => {
    const cantidad = Number(cantidades[servicio.nombre] || 0);
    return total + cantidad * servicio.precio;
  }, 0);

  function buscarReserva(event) {
    event.preventDefault();

    setReserva(null);
    setCantidades({});
    setMensajeBusqueda("");
    setMensajeServicios("");

    const codigoBuscado = codigo.trim().toUpperCase();

    if (!codigoBuscado) {
      setMensajeBusqueda("Debes ingresar el código de reserva.");
      setErrorBusqueda(true);
      return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const encontrada = reservas.find(
      (r) => String(r.codigo).toUpperCase() === codigoBuscado
    );

    if (!encontrada) {
      setMensajeBusqueda("No se encontró una reserva con ese código.");
      setErrorBusqueda(true);
      return;
    }

    if (
      encontrada.estado !== "Confirmada" &&
      encontrada.estado !== "Check-in"
    ) {
      setMensajeBusqueda(
        "Solo puedes agregar servicios a una reserva confirmada o con check-in."
      );
      setErrorBusqueda(true);
      return;
    }

    const cantidadesGuardadas = {};

    if (encontrada.servicios) {
      encontrada.servicios.forEach((servicio) => {
        cantidadesGuardadas[servicio.nombre] = servicio.cantidad;
      });
    }

    setReserva(encontrada);
    setCantidades(cantidadesGuardadas);
    setMensajeBusqueda("Reserva encontrada correctamente.");
    setErrorBusqueda(false);
  }

  function cambiarCantidad(nombre, cantidad) {
    setCantidades({
      ...cantidades,
      [nombre]: Number(cantidad)
    });

    setMensajeServicios("");
  }

  function agregarServicios() {
    if (!reserva) return;

    const seleccionados = SERVICIOS.filter(
      (servicio) => Number(cantidades[servicio.nombre] || 0) > 0
    ).map((servicio) => {
      const cantidad = Number(cantidades[servicio.nombre]);

      return {
        nombre: servicio.nombre,
        cantidad,
        precio: servicio.precio,
        subtotal: cantidad * servicio.precio
      };
    });

    if (seleccionados.length === 0) {
      setMensajeServicios("Debes seleccionar al menos un servicio.");
      setErrorServicios(true);
      return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const indice = reservas.findIndex(
      (r) => String(r.codigo).toUpperCase() ===
        String(reserva.codigo).toUpperCase()
    );

    if (indice === -1) {
      setMensajeServicios("No se encontró la reserva para guardar.");
      setErrorServicios(true);
      return;
    }

    const actual = reservas[indice];

    if (
      actual.estado !== "Confirmada" &&
      actual.estado !== "Check-in"
    ) {
      setMensajeServicios(
        "La reserva ya no permite agregar servicios."
      );
      setErrorServicios(true);
      return;
    }

    const totalAnterior = Number(actual.totalServicios || 0);
    const totalAlojamiento = Number(actual.total) - totalAnterior;

    const actualizada = {
      ...actual,
      servicios: seleccionados,
      totalServicios,
      total: totalAlojamiento + totalServicios
    };

    reservas[indice] = actualizada;

    localStorage.setItem("reservas", JSON.stringify(reservas));

    setReserva(actualizada);
    setMensajeServicios(
      "Servicios agregados correctamente. Total de servicios: " +
        moneda(totalServicios)
    );
    setErrorServicios(false);
  }

  return (
    <>
      <main className="container my-5">
        <h1>Servicios adicionales</h1>

        <p>
          Ingresa el código de tu reserva para agregar servicios
          adicionales a tu estadía.
        </p>

        <section className="mt-4">
          <form onSubmit={buscarReserva}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label htmlFor="codigoReserva" className="form-label">
                  Código de reserva
                </label>

                <input
                  type="text"
                  id="codigoReserva"
                  className="form-control"
                  placeholder="Ej: DT-123456"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-search"></i>{" "}
                  Buscar reserva
                </button>
              </div>
            </div>
          </form>

          {mensajeBusqueda && (
            <p className={
              "mt-3 " + (errorBusqueda ? "text-danger" : "text-success")
            }>
              {mensajeBusqueda}
            </p>
          )}
        </section>

        {reserva && (
          <section className="mt-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2>Reserva {reserva.codigo}</h2>

                <p>
                  <strong>Huésped:</strong>{" "}
                  {reserva.nombre} {reserva.apellido}
                </p>

                <p>
                  <strong>Habitación:</strong> {reserva.habitacion}
                </p>

                <p>
                  <strong>Estado:</strong> {reserva.estado}
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
                      {SERVICIOS.map((servicio) => {
                        const cantidad = Number(
                          cantidades[servicio.nombre] || 0
                        );

                        return (
                          <tr key={servicio.nombre}>
                            <td>{servicio.nombre}</td>

                            <td>
                              <select
                                className="form-select qty-select"
                                value={cantidad}
                                onChange={(e) =>
                                  cambiarCantidad(
                                    servicio.nombre,
                                    e.target.value
                                  )
                                }
                              >
                                {[0, 1, 2, 3, 4].map((numero) => (
                                  <option key={numero} value={numero}>
                                    {numero}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="subtotal">
                              {moneda(cantidad * servicio.precio)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colSpan="2" className="text-end fw-bold">
                          Total servicios:
                        </td>
                        <td className="fw-bold">
                          {moneda(totalServicios)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={agregarServicios}
                  >
                    Agregar servicios
                  </button>
                </div>

                {mensajeServicios && (
                  <p className={
                    "mt-3 " +
                    (errorServicios ? "text-danger" : "text-success")
                  }>
                    {mensajeServicios}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="text-center">
        <p>
          © 2026 Hotel Descanso Total · Viña del Mar, Chile
        </p>
      </footer>
    </>
  );
}
