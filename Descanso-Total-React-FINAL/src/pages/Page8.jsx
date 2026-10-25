import React, {useEffect} from "react";
import initialize from "../legacy/Page8";
export default function Page8() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF06-Gestionar reservas-estilos.css";
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
<a className="nav-link" href="/rf06-gestionar-reservas">{"\r\n                            Reservas\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf07-check-in">{"\r\n                            Check-in\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf08-gestionar-limpieza">{"\r\n                            Limpieza\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf09-check-out-y-cobro">{"\r\n                            Check-out\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf10-reportes">{"\r\n                            Reportes\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="btn btn-outline-danger" href="/">
<i className="bi bi-box-arrow-right"></i>{"\r\n                            Salir\r\n\r\n                        "}</a>
</li>
</ul>
</div>
</nav>
</header>
<main className="container my-5">
<h1>{"Gestión de reservas"}</h1>
<p>{"\r\n            Consulta las reservas del hotel y confirma las solicitudes\r\n            que tengan disponibilidad.\r\n        "}</p>
<section className="row g-3 mt-4">
<div className="col-md-4">
<div className="card text-center h-100">
<div className="card-body">
<h3 className="card-title">{"\r\n                            Solicitudes\r\n                        "}</h3>
<p className="fs-2" id="totalSolicitadas">{"\r\n                            0\r\n                        "}</p>
</div>
</div>
</div>
<div className="col-md-4">
<div className="card text-center h-100">
<div className="card-body">
<h3 className="card-title">{"\r\n                            Confirmadas\r\n                        "}</h3>
<p className="fs-2" id="totalConfirmadas">{"\r\n                            0\r\n                        "}</p>
</div>
</div>
</div>
<div className="col-md-4">
<div className="card text-center h-100">
<div className="card-body">
<h3 className="card-title">{"\r\n                            Total reservas\r\n                        "}</h3>
<p className="fs-2" id="totalReservas">{"\r\n                            0\r\n                        "}</p>
</div>
</div>
</div>
</section>
<section className="row g-3 mt-4">
<div className="col-md-6">
<label htmlFor="buscarCodigo" className="form-label">{"\r\n\r\n                    Buscar por código\r\n\r\n                "}</label>
<input type="text" id="buscarCodigo" className="form-control" placeholder="Ej: DT-1234" />
</div>
<div className="col-md-6">
<label htmlFor="filtroEstado" className="form-label">{"\r\n\r\n                    Filtrar por estado\r\n\r\n                "}</label>
<select id="filtroEstado" className="form-select">
<option value="Todos">{"\r\n                        Todos\r\n                    "}</option>
<option value="Solicitada">{"\r\n                        Solicitada\r\n                    "}</option>
<option value="Confirmada">{"\r\n                        Confirmada\r\n                    "}</option>
<option value="Check-in">{"\r\n                        Check-in\r\n                    "}</option>
<option value="Check-out">{"\r\n                        Check-out\r\n                    "}</option>
<option value="Cancelada">{"\r\n                        Cancelada\r\n                    "}</option>
</select>
</div>
</section>
<section className="mt-5">
<h2>{"Reservas registradas"}</h2>
<div className="table-responsive mt-3">
<table className="table table-striped table-hover align-middle">
<thead>
<tr>
<th>{"Código"}</th>
<th>{"Huésped"}</th>
<th>{"Habitación"}</th>
<th>{"Entrada"}</th>
<th>{"Salida"}</th>
<th>{"Estado"}</th>
<th>{"Acción"}</th>
</tr>
</thead>
<tbody id="tablaReservas">
</tbody>
</table>
</div>
<p id="mensajeReservas" className="mt-3">
</p>
</section>
</main>
<footer className="text-center">
<p>{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>

</>;
}
