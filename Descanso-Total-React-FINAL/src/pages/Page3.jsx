import React, {useEffect} from "react";
import initialize from "../legacy/Page3";
export default function Page3() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF01-Disponibilidad-estilos.css";
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
<a className="nav-link active" href="/rf01-disponibilidad">{"\r\n                        Habitaciones\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf02-registrar-reserva">{"\r\n                        Reservar\r\n                    "}</a>
</li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{"\r\n                        Mi reserva\r\n                    "}</a>
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
<h1>{"Encuentra tu habitación"}</h1>
<p>{"\r\n            Selecciona las fechas de tu estadía y la cantidad de huéspedes\r\n            para consultar las habitaciones disponibles en Hotel Descanso Total.\r\n        "}</p>
<form id="formDisponibilidad">

<div className="row g-3">
<div className="col-6">
<label htmlFor="entrada" className="form-label">{"\r\n                        Entrada\r\n                    "}</label>
<input type="date" id="entrada" name="entrada" className="form-control" />
</div>
<div className="col-6">
<label htmlFor="salida" className="form-label">{"\r\n                        Salida\r\n                    "}</label>
<input type="date" id="salida" name="salida" className="form-control" />
</div>
</div>

<div className="row g-3 mt-3 align-items-end">
<div className="col-6">
<label htmlFor="personas" className="form-label">{"\r\n                        Número de personas\r\n                    "}</label>
<select id="personas" name="personas" className="form-select">
<option value="" selected={true}>{"\r\n                            Seleccionar...\r\n                        "}</option>
<option value="1">{"1 persona"}</option>
<option value="2">{"2 personas"}</option>
<option value="3">{"3 personas"}</option>
<option value="4">{"4 personas"}</option>
<option value="5">{"5 personas"}</option>
</select>
</div>
<div className="col-6">
<button type="submit" className="btn btn-primary">
<i className="bi bi-search"></i>{"\r\n                        Buscar habitación\r\n\r\n                    "}</button>
</div>
</div>
</form>

<section id="resultados" className="mt-5">
<h2>{"Habitaciones disponibles"}</h2>
<div id="listaHabitaciones" className="row g-4">

</div>
<p id="mensajeSinResultados"></p>
</section>
</main>
<footer className="text-center py-4 mt-5 border-top">
<p className="mb-0">{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>


</>;
}
