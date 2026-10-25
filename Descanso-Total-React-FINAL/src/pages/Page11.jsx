import React, {useEffect} from "react";
import initialize from "../legacy/Page11";
export default function Page11() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/RF09-Check-out y cobro-estilos.css";
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
<a className="nav-link active" href="/rf09-check-out-y-cobro">{"\r\n                            Check-out\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf10-reportes">{"\r\n                            Reportes\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="btn btn-outline-danger" href="/">
<i className="bi bi-box-arrow-right"></i>{"\r\n                            Salir\r\n                        "}</a>
</li>
</ul>
</div>
</nav>
</header>
<hr />
<main className="container py-4">
<h1>{"Check-out y cobros"}</h1>
<p className="text-center">{"Calcular total y dejar la habitación pendiente de limpieza"}</p>
<br />
<div className="row justify-content-center g-4">
<div className="col-12 col-md-6">
<div className="card shadow-sm h-100">
<div className="card-body">
<h2 className="h5 card-title">{"Calcular cobro"}</h2>
<form className="row g-3">
<div className="col-md-8">
<label htmlFor="noches" className="form-label">{"Noches"}</label>
<input type="number" id="noches" name="noches" className="form-control" min="1" placeholder="N° de noches" />
</div>
<div className="col-md-4 d-flex align-items-end">
<button type="button" id="btnIngresar" name="ingresar" className="btn btn-primary w-100">{"OK"}</button>
</div>
</form>
<p id="resultado" className="mt-3 mb-0"></p>
</div>
</div>
</div>
</div>
</main>
<hr />
<footer className="text-center py-3">
<p>{"© 2026 Hotel Descanso Total · Viña del Mar, Chile"}</p>
</footer>

</>;
}
