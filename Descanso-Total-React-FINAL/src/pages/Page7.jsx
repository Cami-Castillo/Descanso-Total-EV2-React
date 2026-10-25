import React, {useEffect} from "react";
import initialize from "../legacy/Page7";
export default function Page7() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF05-Cancelar reserva-estilos.css";
   link.setAttribute('data-page-style','');
   document.head.appendChild(link);
   initialize();
   return () => {link.remove();};
 }, []);
 return <>
<header>
<nav className="navbar barra-personalizada">
<div className="container-fluid">
<a className="navbar-brand m-0 p-0" href="/">
<img src="/images/logo.png" alt="Logo Hotel Descanso Total" className="logo" />
</a>
<ul className="navbar-nav flex-row flex-grow-1 justify-content-around align-items-center">
<li className="nav-item">
<a className="nav-link" href="/">{"\r\n                        Inicio\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                        Habitaciones\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf02-registrar-reserva">{"\r\n                        Reservar\r\n                    "}</a>
</li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{"\r\n                        Mi reserva\r\n                    "}</a>
<ul className="dropdown-menu">
<li>
<a className="dropdown-item" href="/rf03-estado-de-reserva">{"\r\n                                Consultar estado\r\n                            "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf04-servicios-adicionales">{"\r\n                                Servicios adicionales\r\n                            "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf05-cancelar-reserva">{"\r\n                                Cancelar reserva\r\n                            "}</a>
</li>
</ul>
</li>
<li className="nav-item">
<a className="nav-link" href="/nosotros">{"\r\n                        Nosotros\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/contacto">{"\r\n                        Contacto\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link portal-privado" href="/rf06-gestionar-reservas">
<i className="bi bi-lock-fill"></i>{"\r\n                        Portal privado\r\n\r\n                    "}</a>
</li>
</ul>
</div>
</nav>
</header>
<main className="container">
<h1>{"Cancelar Reserva"}</h1>
<p>{"\r\n        Ingresa los datos de tu reserva para revisar su estado y solicitar la cancelación.\r\n    "}</p>
<form id="CancelarForm" className="row g-3">
<div className="col-md-6">
<label htmlFor="inputCodigo" className="form-label">{"Código de Reserva"}</label>
<input type="text" className="form-control" id="inputCodigo" placeholder="Ej: DT-1025" />
</div>
<div className="col-md-6">
<label htmlFor="inputEmail" className="form-label">{"Email"}</label>
<input type="email" className="form-control" id="inputEmail" placeholder="correo@ejemplo.com" />
</div>
<div className="col-12">
<button type="submit" className="btn btn-primary">{"\r\n            Buscar reserva\r\n        "}</button>
</div>
</form>
<section id="detalleReserva" className="mt-5">
</section>
</main>
<footer className="text-center py-4 mt-5 border-top">
<p className="mb-0">{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>

</>;
}
