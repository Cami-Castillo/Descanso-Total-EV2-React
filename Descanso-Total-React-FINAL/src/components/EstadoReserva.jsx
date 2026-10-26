
import React from 'react';

export default function EstadoReserva({ reserva }) {
  if (!reserva) return null;

  return (
    <section className="card p-3 mt-3" aria-label="Detalle de reserva">
      <h2 className="h5">Reserva {reserva.codigo}</h2>

      <p><strong>Huésped:</strong> {reserva.nombre} {reserva.apellido}</p>
      <p><strong>Habitación:</strong> {reserva.habitacion}</p>
      <p><strong>Fechas:</strong> {reserva.entrada} al {reserva.salida}</p>
      <p><strong>Estado:</strong> {reserva.estado}</p>
      <p>
        <strong>Total:</strong> ${Number(reserva.total).toLocaleString('es-CL')}
      </p>
    </section>
  );
}
