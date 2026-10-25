
import React from "react";

export default function NavbarAdmin() {
  const enlaces = [
    ["/rf06-gestionar-reservas", "Reservas"],
    ["/rf07-check-in", "Check-in"],
    ["/rf08-gestionar-limpieza", "Limpieza"],
    ["/rf09-check-out-y-cobro", "Check-out"],
    ["/rf10-reportes", "Reportes"]
  ];

  return (
    <nav className="navbar navbar-expand bg-light border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.png"
            alt="Hotel Descanso Total"
            style={{ width: "160px", height: "auto" }}
          />
        </a>

        <div className="navbar-nav ms-auto">
          {enlaces.map(([url, nombre]) => (
            <a className="nav-link px-2" href={url} key={url}>
              {nombre}
            </a>
          ))}

          <a className="btn btn-outline-danger ms-2" href="/">
            Salir
          </a>
        </div>
      </div>
    </nav>
  );
}
