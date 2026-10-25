import React, {useEffect} from "react";
export default function Page1() {
 useEffect(() => {
   const link=document.createElement('link');
   link.rel='stylesheet'; link.href="/styles/LandingPage-estilos.css";
   link.setAttribute('data-page-style','');
   document.head.appendChild(link);
   void 0;
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
<a className="nav-link active" href="/">{"\r\n                            Inicio\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                           Habitaciones\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf02-registrar-reserva">{"\r\n                            Reservar\r\n                        "}</a>
</li>
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{"\r\n                            Mi reserva\r\n                        "}</a>
<ul className="dropdown-menu">
<li>
<a className="dropdown-item" href="/rf03-estado-de-reserva">{"\r\n                                    Consultar estado\r\n                                "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf05-cancelar-reserva">{"\r\n                                    Cancelar reserva\r\n                                "}</a>
</li>
<li>
<a className="dropdown-item" href="/rf04-servicios-adicionales">{"\r\n                                    Servicios adicionales\r\n                                "}</a>
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
<main>

<section className="hero">
<img src="https://i.pinimg.com/originals/c0/05/3e/c0053eaa4975369a2e93e900e1d76e70.jpg" alt="Vista principal del Hotel Descanso Total" />

<div className="hero-texto">
<h1>{"Tu descanso comienza frente al mar"}</h1>
<p>{"\r\n                    Disfruta de una estadía inolvidable en Viña del Mar\r\n                "}</p>
<a href="/rf01-disponibilidad" className="btn btn-primary">{"\r\n                    Buscar habitación\r\n                "}</a>
</div>
</section>
</main>
<footer className="text-center">
<p>{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>


</>;
}
