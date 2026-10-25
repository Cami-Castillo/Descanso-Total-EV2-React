import React, {useEffect} from "react";
export default function Page0() {
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
<a className="nav-link" href="/">{"\r\n                            Inicio\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                            Habitaciones\r\n                        "}</a>
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
</ul>
</li>
<li className="nav-item">
<a className="nav-link" href="/rf04-servicios-adicionales">{"\r\n                            Servicios\r\n                        "}</a>
</li>
<li className="nav-item">
<a className="nav-link" href="/nosotros">{"\r\n                            Nosotros\r\n                        "}</a>
</li>

<li className="nav-item active">
<a className="nav-link active" href="#">{"\r\n                            Contacto\r\n                        "}</a>
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
<h1>{"Contáctanos"}</h1>
<p>{"\r\n            ¿Tienes alguna consulta sobre tu estadía o nuestros servicios?\r\n            Envíanos un mensaje y estaremos encantados de ayudarte.\r\n        "}</p>

<section className="mt-5">
<h2>{"Información de contacto"}</h2>
<p>
<i className="bi bi-geo-alt-fill"></i>
<strong>{"Ubicación:"}</strong>{"\r\n                Viña del Mar, Chile\r\n            "}</p>
<p>
<i className="bi bi-telephone-fill"></i>
<strong>{"Teléfono:"}</strong>{"\r\n                +56 9 1234 5678\r\n            "}</p>
<p>
<i className="bi bi-envelope-fill"></i>
<strong>{"Correo:"}</strong>{"\r\n                contacto@descansototal.cl\r\n            "}</p>
</section>

<section className="mt-5">
<h2>{"Envíanos un mensaje"}</h2>
<form id="contactoForm" className="row g-3">

<div className="col-md-6">
<label htmlFor="nombre" className="form-label">{"\r\n                        Nombre\r\n                    "}</label>
<input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" />
</div>

<div className="col-md-6">
<label htmlFor="email" className="form-label">{"\r\n                        Correo electrónico\r\n                    "}</label>
<input type="email" className="form-control" id="email" placeholder="correo@ejemplo.com" />
</div>

<div className="col-12">
<label htmlFor="asunto" className="form-label">{"\r\n                        Asunto\r\n                    "}</label>
<input type="text" className="form-control" id="asunto" placeholder="¿En qué podemos ayudarte?" />
</div>

<div className="col-12">
<label htmlFor="mensaje" className="form-label">{"\r\n                        Mensaje\r\n                    "}</label>
<textarea className="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje"></textarea>
</div>

<div className="col-12">
<button type="submit" className="btn btn-primary">
<i className="bi bi-send-fill"></i>{"\r\n                        Enviar mensaje\r\n\r\n                    "}</button>
</div>
</form>
<p id="mensajeForm" className="mt-3"></p>
</section>
</main>
<footer className="text-center py-4 mt-5 border-top">
<p className="mb-0">{"\r\n        © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n    "}</p>
</footer>

</>;
}
