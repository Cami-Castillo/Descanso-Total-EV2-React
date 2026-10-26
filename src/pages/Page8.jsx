
import React, { useEffect, useState } from "react";

export default function Page8() {
  const [reservas, setReservas] = useState(() => {
    return JSON.parse(localStorage.getItem("reservas")) || [];
  });

  const [buscarCodigo, setBuscarCodigo] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/RF06-Gestionar reservas-estilos.css";
    link.setAttribute("data-page-style", "");
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  const totalSolicitadas = reservas.filter(
    (reserva) => reserva.estado === "Solicitada"
  ).length;

  const totalConfirmadas = reservas.filter(
    (reserva) => reserva.estado === "Confirmada"
  ).length;

  const totalReservas = reservas.length;

  const reservasFiltradas = reservas.filter((reserva) => {
    const coincideCodigo = reserva.codigo
      .toUpperCase()
      .includes(buscarCodigo.trim().toUpperCase());

    const coincideEstado =
      filtroEstado === "Todos" || reserva.estado === filtroEstado;

    return coincideCodigo && coincideEstado;
  });

  function fechasSeCruzan(entrada1, salida1, entrada2, salida2) {
    const inicio1 = new Date(entrada1);
    const fin1 = new Date(salida1);
    const inicio2 = new Date(entrada2);
    const fin2 = new Date(salida2);

    return inicio1 < fin2 && fin1 > inicio2;
  }

  function confirmarReserva(codigo) {
    const reservasActuales =
      JSON.parse(localStorage.getItem("reservas")) || [];

    const seleccionada = reservasActuales.find(
      (reserva) => reserva.codigo === codigo
    );

    if (!seleccionada) {
      setMensaje("No se encontró la reserva.");
      setTipoMensaje("danger");
      return;
    }

    if (seleccionada.estado !== "Solicitada") {
      setMensaje("Esta reserva ya no se puede confirmar.");
      setTipoMensaje("danger");
      setReservas(reservasActuales);
      return;
    }

    const conflicto = reservasActuales.some((reserva) => {
      if (reserva.codigo === codigo) return false;

      if (
        reserva.estado !== "Confirmada" &&
        reserva.estado !== "Check-in"
      ) {
        return false;
      }

      if (reserva.habitacion !== seleccionada.habitacion) {
        return false;
      }

      return fechasSeCruzan(
        seleccionada.entrada,
        seleccionada.salida,
        reserva.entrada,
        reserva.salida
      );
    });

    if (conflicto) {
      setMensaje(
        "No se puede confirmar la reserva porque la habitación ya está asignada para ese período."
      );
      setTipoMensaje("danger");
      return;
    }

    const actualizadas = reservasActuales.map((reserva) =>
      reserva.codigo === codigo
        ? { ...reserva, estado: "Confirmada" }
        : reserva
    );

    localStorage.setItem("reservas", JSON.stringify(actualizadas));

    setReservas(actualizadas);
    setMensaje(`Reserva ${codigo} confirmada correctamente.`);
    setTipoMensaje("success");
  }

  return (
    <>
      <main className="container my-5">
        <h1>Gestión de reservas</h1>

        <p>
          Consulta las reservas del hotel y confirma las solicitudes
          que tengan disponibilidad.
        </p>

        <section className="row g-3 mt-4">
          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Solicitudes</h3>
                <p className="fs-2">{totalSolicitadas}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Confirmadas</h3>
                <p className="fs-2">{totalConfirmadas}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="card-title">Total reservas</h3>
                <p className="fs-2">{totalReservas}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="row g-3 mt-4">
          <div className="col-md-6">
            <label htmlFor="buscarCodigo" className="form-label">
              Buscar por código
            </label>

            <input
              type="text"
              id="buscarCodigo"
              className="form-control"
              placeholder="Ej: DT-1234"
              value={buscarCodigo}
              onChange={(e) => setBuscarCodigo(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="filtroEstado" className="form-label">
              Filtrar por estado
            </label>

            <select
              id="filtroEstado"
              className="form-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Solicitada">Solicitada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Check-in">Check-in</option>
              <option value="Check-out">Check-out</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </section>

        <section className="mt-5">
          <h2>Reservas registradas</h2>

          <div className="table-responsive mt-3">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Huésped</th>
                  <th>Habitación</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {reservasFiltradas.map((reserva) => (
                  <tr key={reserva.codigo}>
                    <td>{reserva.codigo}</td>
                    <td>
                      {reserva.nombre} {reserva.apellido}
                    </td>
                    <td>{reserva.habitacion}</td>
                    <td>{reserva.entrada}</td>
                    <td>{reserva.salida}</td>
                    <td>{reserva.estado}</td>

                    <td>
                      {reserva.estado === "Solicitada" ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            confirmarReserva(reserva.codigo)
                          }
                        >
                          Confirmar
                        </button>
                      ) : (
                        "Sin acciones"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reservasFiltradas.length === 0 && (
            <p className="mt-3 text-muted">
              No existen reservas para mostrar.
            </p>
          )}

          {mensaje && (
            <p className={`mt-3 text-${tipoMensaje}`} role="status">
              {mensaje}
            </p>
          )}
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
