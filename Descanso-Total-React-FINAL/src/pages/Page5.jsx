import React, {useEffect} from "react";
import initialize from "../legacy/Page5";
export default function Page5() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF03-Estado de reserva-estilos.css";
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
<a className="nav-link" href="/">{"\r\n                            Inicio\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                            Habitaciones\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf02-registrar-reserva">{"\r\n                            Reservar\r\n                        "}</a>
</li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{"\r\n\r\n                            Mi reserva\r\n\r\n                        "}</a>
<ul className="dropdown-menu">
<li>
<a className="dropdown-item" href="/rf03-estado-de-reserva">{"\r\n                                    Consultar estado\r\n                                "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf04-servicios-adicionales">{"\r\n                                    Servicios adicionales\r\n                                "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf05-cancelar-reserva">{"\r\n                                    Cancelar reserva\r\n                                "}</a>
</li>
</ul>
</li>
<li className="nav-item">
<a className="nav-link" href="/nosotros">{"\r\n                            Nosotros\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/contacto">{"\r\n                            Contacto\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link portal-privado" href="/rf06-gestionar-reservas">
<i className="bi bi-lock-fill"></i>{"\r\n                            Portal privado\r\n\r\n                        "}</a>
</li>
</ul>
</div>
</nav>
</header>
<main className="container my-5">
<h1>{"Consultar estado de reserva"}</h1>
<p>{"\r\n            Ingresa tu código de reserva para consultar los datos\r\n            y el estado actual de tu estadía.\r\n        "}</p>
<section className="mt-4">
<form id="formConsulta">
<div className="row g-3 align-items-end">
<div className="col-md-8">
<label htmlFor="codigoInput" className="form-label">{"\r\n\r\n                            Código de reserva\r\n\r\n                        "}</label>
<input type="text" id="codigoInput" className="form-control" placeholder="Ej: DT-1234" />
</div>
<div className="col-md-4">
<button type="submit" className="btn btn-primary w-100">
<i className="bi bi-search"></i>{"\r\n                            Buscar reserva\r\n\r\n                        "}</button>
</div>
</div>
</form>
</section>
<p id="mensajeConsulta" className="mt-4">
</p>
<section id="resultado" className="mt-4" style={{"display": "none"}}>
<div className="card shadow-sm">
<div className="card-body">
<div className="d-flex justify-content-between align-items-center mb-4">
<h2 className="card-title m-0">{"\r\n\r\n                            Reserva\r\n                            "}<span id="reservaCodigo"></span>
</h2>
<span id="estadoReserva" className="badge">
</span>
</div>
<p>
<strong>{"Huésped:"}</strong>
<span id="huesped"></span>
</p>
<p>
<strong>{"Habitación:"}</strong>
<span id="habitacion"></span>
</p>
<p>
<strong>{"Entrada:"}</strong>
<span id="entrada"></span>
</p>
<p>
<strong>{"Salida:"}</strong>
<span id="salida"></span>
</p>
<p>
<strong>{"Personas:"}</strong>
<span id="personas"></span>
</p>
</div>
</div>
</section>
</main>
<footer className="text-center">
<p>{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>

</>;
}
