import React, {useEffect} from "react";
export default function Page2() {
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
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                            Habitaciones                        \r\n                        "}</a>
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
<h1>{"Sobre nosotros"}</h1>
<p>{"\r\n            En Hotel Descanso Total queremos ofrecer una experiencia\r\n            cómoda, tranquila y cercana al mar en Viña del Mar.\r\n        "}</p>
<h2 className="mt-5">{"Nuestro hotel"}</h2>
<p>{"\r\n            Descanso Total es un hotel cuatro estrellas que ofrece\r\n            alojamiento y servicios pensados para brindar comodidad\r\n            y una experiencia agradable a nuestros huéspedes.\r\n        "}</p>
<h2 className="mt-5">{"Nuestra misión"}</h2>
<p>{"\r\n            Entregar una experiencia de alojamiento cómoda y confiable,\r\n            acompañada de una atención cercana y servicios de calidad.\r\n        "}</p>
</main>
<footer className="text-center">
<p>{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>


</>;
}
