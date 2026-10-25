import React, {useMemo,useState} from 'react';
import {HABITACIONES,obtenerReservas,disponible,crearReserva} from '../data/reservas';
import '../styles-reserva.css';

const moneda = numero => '$' + numero.toLocaleString('es-CL');
const hoy = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const valorInicial={nombre:'',apellido:'',email:'',telefono:'',rut:'',entrada:'',salida:'',huespedes:'2',habitacion:'',condiciones:false};
export default function Page4(){
 const params=useMemo(()=>new URLSearchParams(window.location.search),[]);
 const [datos,setDatos]=useState(()=>({...valorInicial,entrada:params.get('entrada')||'',salida:params.get('salida')||'',huespedes:params.get('huespedes')||'2',habitacion:params.get('habitacion')||''}));
 const [error,setError]=useState('');
 const [reserva,setReserva]=useState(null);
 const set=(key,value)=>{setDatos(old=>({...old,[key]:value,...(['entrada','salida','huespedes'].includes(key)?{habitacion:''}:{})}));setError('');setReserva(null)};
 const opciones=HABITACIONES.filter(h=>Number(datos.huespedes)>=1&&h.capacidad>=Number(datos.huespedes)&&datos.entrada&&datos.salida&&datos.salida>datos.entrada&&disponible(h,datos.entrada,datos.salida));
 const hab=HABITACIONES.find(h=>h.clave===datos.habitacion);
 const noches=datos.entrada&&datos.salida&&datos.salida>datos.entrada?Math.round((Date.parse(datos.salida+'T12:00:00')-Date.parse(datos.entrada+'T12:00:00'))/86400000):0;
 function enviar(e){
 e.preventDefault();setReserva(null);setError('');
 if(!datos.nombre.trim()||!datos.apellido.trim()||!datos.email.trim()||!datos.telefono.trim()||!datos.rut.trim()||!datos.entrada||!datos.salida){setError('Completa todos los datos de contacto y las fechas.');return}
 if(datos.nombre.trim().length<2||datos.apellido.trim().length<2){setError('Nombre y apellido deben tener al menos 2 caracteres.');return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)){setError('Ingresa un correo válido.');return}
 if(!/^\d{9}$/.test(datos.telefono.replace(/\s/g,''))){setError('El teléfono debe tener 9 dígitos.');return}
 if(!/^\d{7,8}-[0-9kK]$/.test(datos.rut.trim())){setError('Ingresa el RUT con formato 12345678-9.');return}
 if(datos.entrada<hoy()||datos.salida<=datos.entrada){setError('Selecciona fechas válidas: entrada desde hoy y salida posterior.');return}
 if(!Number.isInteger(Number(datos.huespedes))||Number(datos.huespedes)<1){setError('Ingresa una cantidad válida de huéspedes.');return}
 if(!hab){setError('Selecciona una habitación disponible.');return}
 if(Number(datos.huespedes)>hab.capacidad||!disponible(hab,datos.entrada,datos.salida)){setError('La habitación no está disponible para esas fechas o cantidad de huéspedes.');return}
 if(!datos.condiciones){setError('Debes aceptar los términos y condiciones.');return}
 const nueva={codigo:codigoNuevo(),nombre:datos.nombre.trim(),apellido:datos.apellido.trim(),email:datos.email.trim(),telefono:datos.telefono.trim(),rut:datos.rut.trim(),entrada:datos.entrada,salida:datos.salida,huespedes:Number(datos.huespedes),habitacion:hab.nombre,precio:hab.precio,noches,total:noches*hab.precio,estado:'Solicitada'};
 try{setReserva(crearReserva(nueva))}catch(e){setError(e.message||'No se pudo guardar la reserva.')}
 }
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
<a className="nav-link" href="/rf01-disponibilidad">{"\r\n                        Habitaciones\r\n                    "}</a>
</li>
<li className="nav-item">
<a className="nav-link active" href="/rf02-registrar-reserva">{"\r\n                        Reservar\r\n                    "}</a>
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

<main className="container py-4">
 <h1>Reserva tu estadía</h1>
 <p>Completa los datos y selecciona una habitación disponible en Hotel Descanso Total.</p>
 <form onSubmit={enviar} className="row g-3" noValidate>
 <h2>Datos de contacto</h2>
 {[["nombre","Nombre"],["apellido","Apellido"],["email","Email"],["telefono","Teléfono"],["rut","RUT"]].map(([campo,titulo])=><div className="col-md-6" key={campo}><label className="form-label" htmlFor={'res-'+campo}>{titulo}</label><input className="form-control" id={'res-'+campo} type={campo==='email'?'email':'text'} value={datos[campo]} onChange={e=>set(campo,e.target.value)} required /></div>)}
 <h2>Datos de estadía</h2>
 <div className="col-md-6"><label htmlFor="res-entrada" className="form-label">Fecha de entrada</label><input id="res-entrada" type="date" min={hoy()} className="form-control" value={datos.entrada} onChange={e=>set('entrada',e.target.value)}/></div>
 <div className="col-md-6"><label htmlFor="res-salida" className="form-label">Fecha de salida</label><input id="res-salida" type="date" min={datos.entrada||hoy()} className="form-control" value={datos.salida} onChange={e=>set('salida',e.target.value)}/></div>
 <div className="col-md-6"><label htmlFor="res-huespedes" className="form-label">Cantidad de huéspedes</label><input id="res-huespedes" type="number" min="1" max="4" step="1" className="form-control" value={datos.huespedes} onChange={e=>set('huespedes',e.target.value)}/></div>
 <div className="col-md-6"><label htmlFor="res-habitacion" className="form-label">Seleccionar habitación</label><select id="res-habitacion" className="form-select" value={datos.habitacion} onChange={e=>set('habitacion',e.target.value)}><option value="">Seleccione habitación disponible</option>{opciones.map(h=><option value={h.clave} key={h.codigo}>{h.nombre} ({h.capacidad} pers.) — {moneda(h.precio)}/noche</option>)}</select><div className="form-text">Se muestran solo habitaciones con capacidad y disponibilidad para las fechas escogidas.</div></div>
 {datos.entrada&&datos.salida&&opciones.length===0&&<p className="text-warning">No hay habitaciones disponibles para esas fechas y cantidad de huéspedes.</p>}
 {hab&&noches>0&&<div className="col-12"><p className="alert alert-info">{noches} noche(s) × {moneda(hab.precio)} = <strong>{moneda(noches*hab.precio)}</strong></p></div>}
 <div className="col-12"><label className="form-check"><input type="checkbox" className="form-check-input" checked={datos.condiciones} onChange={e=>set('condiciones',e.target.checked)}/><span className="form-check-label">Acepto los términos y condiciones</span></label></div>
 <div className="col-12"><button type="submit" className="btn btn-primary">Solicitar Reserva</button></div>
 </form>
 {error&&<div role="alert" className="alert alert-danger mt-4">{error}</div>}
 {reserva&&<section className="alert alert-success mt-4" aria-live="polite"><h2>¡Reserva solicitada!</h2><p><strong>Código de reserva:</strong> {reserva.codigo}</p><p><strong>Huésped:</strong> {reserva.nombre} {reserva.apellido}</p><p><strong>Habitación:</strong> {reserva.habitacion}</p><p><strong>Estadía:</strong> {reserva.entrada} al {reserva.salida} ({reserva.noches} noche/s)</p><p><strong>Huéspedes:</strong> {reserva.huespedes}</p><p><strong>Total estimado:</strong> {moneda(reserva.total)}</p><p><strong>Estado:</strong> {reserva.estado}</p><p>Guarda tu código para consultar tu reserva.</p><a href="/rf03-estado-de-reserva" className="btn btn-outline-success">Consultar mi reserva</a></section>}
</main>
<footer className="text-center py-4 mt-5 border-top">
<p className="mb-0">{"\r\n            © 2026 Hotel Descanso Total · Viña del Mar, Chile\r\n        "}</p>
</footer>

</>;
}
