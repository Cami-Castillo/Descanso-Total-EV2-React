
import React, { useState } from "react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [gestionAbierta, setGestionAbierta] = useState(false);

  const enlaces = [
    ["/", "Inicio"],
    ["/rf01-disponibilidad", "Habitaciones"],
    ["/rf02-registrar-reserva", "Reservar"],
    ["/rf03-estado-de-reserva", "Mi reserva"],
    ["/rf05-cancelar-reserva", "Cancelar"],
    ["/rf04-servicios-adicionales", "Servicios"],
    ["/nosotros", "Nosotros"],
    ["/contacto", "Contacto"]
  ];

  const gestion = [
    ["/rf06-gestionar-reservas", "Reservas"],
    ["/rf07-check-in", "Check-in"],
    ["/rf08-gestionar-limpieza", "Limpieza"],
    ["/rf09-check-out-y-cobro", "Check-out"],
    ["/rf10-reportes", "Reportes"]
  ];

  return (
    <nav className="navbar navbar-expand-xl bg-light border-bottom">
      <div className="container-fluid px-3">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.png"
            alt="Hotel Descanso Total"
            style={{
              width: "160px",
              maxWidth: "100%",
              height: "auto"
            }}
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
            {enlaces.map(([url, nombre]) => (
              <li className="nav-item" key={url}>
                <a className="nav-link px-xl-2" href={url}>
                  {nombre}
                </a>
              </li>
            ))}

            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link dropdown-toggle"
                aria-expanded={gestionAbierta}
                onClick={() => setGestionAbierta(!gestionAbierta)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Gestión Hotel
              </button>

              <ul
                className={
                  "dropdown-menu dropdown-menu-end" +
                  (gestionAbierta ? " show" : "")
                }
              >
                {gestion.map(([url, nombre]) => (
                  <li key={url}>
                    <a className="dropdown-item" href={url}>
                      {nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
