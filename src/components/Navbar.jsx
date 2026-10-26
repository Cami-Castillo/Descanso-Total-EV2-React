
import React, { useState } from "react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [reservaAbierta, setReservaAbierta] = useState(false);

  const enlaces = [
    ["/", "Inicio"],
    ["/rf01-disponibilidad", "Habitaciones"],
    ["/rf02-registrar-reserva", "Reservar"],
    ["/nosotros", "Nosotros"],
    ["/contacto", "Contacto"]
  ];

  function cerrarMenus() {
    setReservaAbierta(false);
    setMenuAbierto(false);
  }

  return (
    <nav className="navbar navbar-expand-xl bg-light border-bottom">
      <div className="container-fluid px-3">
        <a className="navbar-brand" href="/" onClick={cerrarMenus}>
          <img
            src="/images/logo.png"
            alt="Hotel Descanso Total"
            style={{ width: "160px", height: "auto" }}
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Mostrar menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={
            "collapse navbar-collapse" +
            (menuAbierto ? " show" : "")
          }
        >
          <ul className="navbar-nav ms-auto align-items-xl-center">
            {enlaces.slice(0, 3).map(([url, nombre]) => (
              <li className="nav-item" key={url}>
                <a
                  className="nav-link px-xl-2"
                  href={url}
                  onClick={cerrarMenus}
                >
                  {nombre}
                </a>
              </li>
            ))}

            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link dropdown-toggle px-xl-2"
                aria-expanded={reservaAbierta}
                aria-controls="menuReserva"
                onClick={() => setReservaAbierta(!reservaAbierta)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Mi reserva
              </button>

              <ul
                id="menuReserva"
                className={
                  "dropdown-menu" +
                  (reservaAbierta ? " show" : "")
                }
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="/rf03-estado-de-reserva"
                    onClick={cerrarMenus}
                  >
                    Consultar estado
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="/rf04-servicios-adicionales"
                    onClick={cerrarMenus}
                  >
                    Servicios adicionales
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="/rf05-cancelar-reserva"
                    onClick={cerrarMenus}
                  >
                    Cancelar reserva
                  </a>
                </li>
              </ul>
            </li>

            {enlaces.slice(3).map(([url, nombre]) => (
              <li className="nav-item" key={url}>
                <a
                  className="nav-link px-xl-2"
                  href={url}
                  onClick={cerrarMenus}
                >
                  {nombre}
                </a>
              </li>
            ))}

            <li className="nav-item">
              <a
                className="nav-link px-xl-2"
                href="/rf06-gestionar-reservas"
                onClick={cerrarMenus}
              >
                <i className="bi bi-lock-fill me-1"></i>
                Portal administrador
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
