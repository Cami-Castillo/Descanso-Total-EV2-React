export const HABITACIONES = [
  {codigo:'HAB001', clave:'simple', nombre:'Habitación Simple', capacidad:1, precio:65000, estado:'Disponible'},
  {codigo:'HAB002', clave:'doble', nombre:'Habitación Doble', capacidad:2, precio:85000, estado:'Disponible'},
  {codigo:'HAB003', clave:'superior', nombre:'Habitación Superior', capacidad:2, precio:120000, estado:'En limpieza'},
  {codigo:'HAB004', clave:'ejecutiva', nombre:'Suite Ejecutiva', capacidad:3, precio:180000, estado:'Ocupada'},
  {codigo:'HAB005', clave:'presidencial', nombre:'Suite Presidencial', capacidad:4, precio:350000, estado:'Disponible'},
];
export function obtenerReservas(){
  try { const data=JSON.parse(localStorage.getItem('reservas')||'[]'); return Array.isArray(data)?data:[]; }
  catch {return []}
}
export function seCruzan(a,b,c,d){return a<d && b>c}
export function disponible(habitacion,entrada,salida){
  if(habitacion.estado!=='Disponible')return false;
  return !obtenerReservas().some(r=>r.habitacion===habitacion.nombre && r.estado!=='Cancelada' && seCruzan(entrada,salida,r.entrada,r.salida));
}
export function codigoNuevo(){
  const codigos=new Set(obtenerReservas().map(r=>r.codigo));
  let codigo; do { codigo='DT-'+Math.floor(100000+Math.random()*900000); }while(codigos.has(codigo)); return codigo;
}
