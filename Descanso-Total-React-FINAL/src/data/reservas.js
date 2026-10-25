// Catálogo del caso entregado por DUOC. Datos demostrativos, no hotel real.
export const HABITACIONES = [
  {codigo:'HAB001',clave:'simple',nombre:'Habitación Simple',capacidad:1,precio:65000,estado:'Disponible'},
  {codigo:'HAB002',clave:'doble',nombre:'Habitación Doble',capacidad:2,precio:85000,estado:'Disponible'},
  {codigo:'HAB003',clave:'superior',nombre:'Habitación Superior',capacidad:2,precio:120000,estado:'En limpieza'},
  {codigo:'HAB004',clave:'ejecutiva',nombre:'Suite Ejecutiva',capacidad:3,precio:180000,estado:'Ocupada'},
  {codigo:'HAB005',clave:'presidencial',nombre:'Suite Presidencial',capacidad:4,precio:350000,estado:'Disponible'},
];
export const SERVICIOS=[{codigo:'SE001',nombre:'Desayuno',precio:12000},{codigo:'SE002',nombre:'Spa',precio:25000},{codigo:'SE003',nombre:'Estacionamiento',precio:10000},{codigo:'SE004',nombre:'Cena',precio:20000}];
const KEY='reservas';
export const seCruzan=(a,b,c,d)=>a<d&&b>c;
export const nochesEntre=(entrada,salida)=>Math.round((Date.parse(salida+'T12:00:00')-Date.parse(entrada+'T12:00:00'))/86400000);
export function obtenerReservas(){try{const d=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(d)?d:[]}catch{return []}}
export const buscarReserva=(codigo)=>obtenerReservas().find(r=>r.codigo?.toUpperCase()===String(codigo).trim().toUpperCase())||null;
export function guardarReservas(items){localStorage.setItem(KEY,JSON.stringify(items));return items}
export function disponible(habitacion,entrada,salida,ignorarCodigo=''){
  if(!habitacion||habitacion.estado!=='Disponible'||!entrada||!salida||salida<=entrada)return false;
  return !obtenerReservas().some(r=>r.codigo!==ignorarCodigo&&r.habitacion===habitacion.nombre&&r.estado!=='Cancelada'&&seCruzan(entrada,salida,r.entrada,r.salida));
}
export function codigoNuevo(){const usados=new Set(obtenerReservas().map(r=>r.codigo));let codigo;do{codigo='DT-'+Math.floor(100000+Math.random()*900000)}while(usados.has(codigo));return codigo}
export function validarReserva(datos,fechaMinima='0000-00-00'){
  if(!datos.nombre?.trim()||!datos.apellido?.trim()||!datos.email?.trim()||!datos.telefono?.trim()||!datos.rut?.trim())return 'Completa todos los datos de contacto.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email))return 'Ingresa un correo válido.';
  if(!/^\d{9}$/.test(datos.telefono.replace(/\s/g,'')))return 'El teléfono debe tener 9 dígitos.';
  if(!/^\d{7,8}-[0-9kK]$/.test(datos.rut.trim()))return 'Ingresa el RUT con formato 12345678-9.';
  if(!datos.entrada||!datos.salida||datos.entrada<fechaMinima||nochesEntre(datos.entrada,datos.salida)<1)return 'Selecciona fechas válidas.';
  if(!Number.isInteger(Number(datos.huespedes))||Number(datos.huespedes)<1)return 'Cantidad de huéspedes inválida.';
  const habitacion=HABITACIONES.find(h=>h.nombre===datos.habitacion||h.clave===datos.habitacion);
  if(!habitacion||habitacion.capacidad<Number(datos.huespedes)||!disponible(habitacion,datos.entrada,datos.salida,datos.codigo))return 'Habitación sin capacidad o disponibilidad.';
  return null;
}
export function crearReserva(datos){const error=validarReserva(datos);if(error)throw new Error(error);const h=HABITACIONES.find(x=>x.nombre===datos.habitacion||x.clave===datos.habitacion);const noches=nochesEntre(datos.entrada,datos.salida);const nueva={...datos,codigo:codigoNuevo(),habitacion:h.nombre,precio:h.precio,noches,total:noches*h.precio,estado:'Solicitada'};guardarReservas([...obtenerReservas(),nueva]);return nueva}
export function actualizarReserva(codigo,cambios){const anterior=buscarReserva(codigo);if(!anterior)throw new Error('No existe esa reserva.');if(['Cancelada','Check-out'].includes(anterior.estado))throw new Error('Esta reserva ya no se puede editar.');const r={...anterior,...cambios,codigo:anterior.codigo};const error=validarReserva(r);if(error)throw new Error(error);const h=HABITACIONES.find(x=>x.nombre===r.habitacion||x.clave===r.habitacion);r.habitacion=h.nombre;r.precio=h.precio;r.noches=nochesEntre(r.entrada,r.salida);r.total=r.noches*h.precio;guardarReservas(obtenerReservas().map(x=>x.codigo===codigo?r:x));return r}
export function cancelarReserva(codigo){const r=buscarReserva(codigo);if(!r)throw new Error('No existe esa reserva.');if(['Check-in','Check-out'].includes(r.estado))throw new Error('No se puede cancelar una estadía iniciada o terminada.');if(r.estado==='Cancelada')return r;const cambiado={...r,estado:'Cancelada'};guardarReservas(obtenerReservas().map(x=>x.codigo===r.codigo?cambiado:x));return cambiado}
