import React from 'react';
export default function Navbar(){return <nav className="navbar navbar-expand-lg bg-light border-bottom"><div className="container-fluid">
<a className="navbar-brand" href="/"><img src="/images/logo.png" alt="Hotel Descanso Total" width="160" /></a>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuHotel" aria-controls="menuHotel" aria-expanded="false" aria-label="Mostrar menú"><span className="navbar-toggler-icon"/></button>
<div id="menuHotel" className="collapse navbar-collapse"><ul className="navbar-nav ms-auto gap-lg-2">
{[['/','Inicio'],['/rf01-disponibilidad','Habitaciones'],['/rf02-registrar-reserva','Reservar'],['/rf03-estado-de-reserva','Mi reserva'],['/rf05-cancelar-reserva','Cancelar'],['/rf06-gestionar-reservas','Gestión'],['/nosotros','Nosotros']].map(([url,nombre])=><li className="nav-item" key={url}><a className="nav-link" href={url}>{nombre}</a></li>)}
</ul></div></div></nav>}
