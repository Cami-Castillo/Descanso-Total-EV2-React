import React, {useEffect} from "react";
import initialize from "../legacy/Page6";
export default function Page6() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF04-Servicios adicionales-estilos.css";
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
<h1>{"Servicios adicionales"}</h1>
<p>{"\r\n            Ingresa el código de tu reserva para agregar servicios\r\n            adicionales a tu estadía.\r\n        "}</p>
<section className="mt-4">
<form id="formBuscarReserva">
<div className="row g-3 align-items-end">
<div className="col-md-8">
<label htmlFor="codigoReserva" className="form-label">{"\r\n\r\n                            Código de reserva\r\n\r\n                        "}</label>
<input type="text" id="codigoReserva" className="form-control" placeholder="Ej: DT-1234" />
</div>
<div className="col-md-4">
<button type="submit" className="btn btn-primary w-100">
<i className="bi bi-search"></i>{"\r\n                            Buscar reserva\r\n\r\n                        "}</button>
</div>
</div>
</form>
<p id="mensajeBusqueda" className="mt-3">
</p>
</section>
<section id="seccionServicios" className="mt-5" style={{"display": "none"}}>
<div className="card shadow-sm">
<div className="card-body">
<h2>{"Reserva "}<span id="codigoEncontrado"></span></h2>
<p>
<strong>{"Huésped:"}</strong>
<span id="nombreHuesped"></span>
</p>
<p>
<strong>{"Habitación:"}</strong>
<span id="habitacionReserva"></span>
</p>
<p>
<strong>{"Estado:"}</strong>
<span id="estadoReserva"></span>
</p>
<h3 className="mt-4">{"\r\n                        Selecciona tus servicios\r\n                    "}</h3>
<div className="table-responsive mt-3">
<table className="table table-bordered table-striped align-middle">
<thead>
<tr>
<th>{"Servicio"}</th>
<th>{"Cantidad"}</th>
<th>{"Subtotal"}</th>
</tr>
</thead>
<tbody>
<tr>
<td>{"Desayuno"}</td>
<td>
<select className="form-select qty-select" data-servicio="Desayuno" data-price="25000">
<option value="0">{"0"}</option>
<option value="1">{"1"}</option>
<option value="2">{"2"}</option>
<option value="3">{"3"}</option>
</select>
</td>
<td className="subtotal">{"\r\n                                        $0\r\n                                    "}</td>
</tr>
<tr>
<td>{"Spa"}</td>
<td>
<select className="form-select qty-select" data-servicio="Spa" data-price="15000">
<option value="0">{"0"}</option>
<option value="1">{"1"}</option>
<option value="2">{"2"}</option>
</select>
</td>
<td className="subtotal">{"\r\n                                        $0\r\n                                    "}</td>
</tr>
<tr>
<td>{"Cena"}</td>
<td>
<select className="form-select qty-select" data-servicio="Cena" data-price="35000">
<option value="0">{"0"}</option>
<option value="1">{"1"}</option>
<option value="2">{"2"}</option>
<option value="3">{"3"}</option>
</select>
</td>
<td className="subtotal">{"\r\n                                        $0\r\n                                    "}</td>
</tr>
<tr>
<td>{"Estacionamiento"}</td>
<td>
<select className="form-select qty-select" data-servicio="Estacionamiento" data-price="15000">
<option value="0">{"0"}</option>
<option value="1">{"1"}</option>
<option value="2">{"2"}</option>
</select>
</td>
<td className="subtotal">{"\r\n                                        $0\r\n                                    "}</td>
</tr>
</tbody>
<tfoot>
<tr>
<td colSpan="2" className="text-end fw-bold">{"\r\n\r\n                                        Total servicios:\r\n\r\n                                    "}</td>
<td id="grand-total" className="fw-bold">{"\r\n\r\n                                        $0\r\n\r\n                                    "}</td>
</tr>
</tfoot>
</table>
</div>
<div className="text-end">
<button type="button" id="btnAgregarServicios" className="btn btn-primary">{"\r\n\r\n                            Agregar servicios\r\n\r\n                        "}</button>
</div>
<p id="mensajeServicios" className="mt-3">
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
