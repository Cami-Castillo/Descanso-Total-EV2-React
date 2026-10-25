import React, {useEffect} from "react";
import initialize from "../legacy/Page10";
export default function Page10() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF08-Gestionar limpieza-estilos.css";
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
<a className="nav-link" href="/rf06-gestionar-reservas">{"\r\n                                Reservas\r\n                            "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf07-check-in">{"\r\n                                Check-in\r\n                            "}</a>
</li>
<li className="nav-item">
<a className="nav-link active" href="/rf08-gestionar-limpieza">{"\r\n                                Limpieza\r\n                            "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf09-check-out-y-cobro">{"\r\n                                Check-out\r\n                            "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf10-reportes">{"\r\n                                Reportes\r\n                            "}</a>
</li>
<li className="nav-item">
<a className="btn btn-outline-danger" href="/">
<i className="bi bi-box-arrow-right"></i>{"\r\n                                Salir\r\n                            "}</a>
</li>
</ul>
</div>
</nav>
</header>
<hr />
<main className="container py-4">
<h1>{"Limpieza"}</h1>
<p className="text-center">{"Asignar limpieza y actualizar el estado de la habitacion"}</p>
<br />
<div className="row justify-content-center g-4">
<div className="col-12 col-md-4">
<div className="card shadow-sm h-100">
<div className="card-body">
<h2 className="h5 card-title">{"Habitación"}</h2>
<form className="row g-3">
<div className="col-12">
<label htmlFor="habitacion" className="form-label">{"Habitación"}</label>
<input type="number" id="habitacion" name="habitacion" className="form-control" min="1" placeholder="N° de habitación" />
</div>
</form>
<p id="resultado" className="mt-2 mb-0"></p>
</div>
</div>
</div>
<div className="col-12 col-md-4">
<div className="card shadow-sm h-100">
<div className="card-body">
<h2 className="h5 card-title">{"Asignar persona"}</h2>
<form className="row g-3">
<div className="col-md-8">
<label htmlFor="persona" className="form-label">{"Persona asignada"}</label>
<select id="persona" name="persona" className="form-select">
<option value="">
</option>
<option value="Benjamín Romero">{"Benjamín Romero"}</option>
<option value="Camila Castillo">{"Camila Castillo"}</option>
<option value="Rubén Espejo">{"Rubén Espejo"}</option>
</select>
</div>
<div className="col-md-4 d-flex align-items-end">
<button type="button" id="btnAsignar" className="btn btn-primary">{"Asignar"}</button>
</div>
</form>
<p id="resultado2" className="mt-2 mb-0"></p>
</div>
</div>
</div>
<div className="col-12 col-md-4">
<div className="card shadow-sm h-100">
<div className="card-body">
<h2 className="h5 card-title">{"Estado habitación"}</h2>
<p id="estado" className="fw-semibold">{"Pendiente"}</p>
<button type="button" id="btnCompletar" className="btn btn-primary" disabled={true}>{"Marcar como completado"}</button>
<p id="resultado3" className="mt-2 mb-0"></p>
</div>
</div>
</div>
</div></main>
<hr />
<footer>
</footer>

</>;
}
