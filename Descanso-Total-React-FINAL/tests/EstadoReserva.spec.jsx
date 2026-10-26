
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import EstadoReserva from '../src/components/EstadoReserva.jsx';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Componente EstadoReserva', () => {
  let contenedor;
  let root;

  const reserva = {
    codigo: 'DT-797286',
    nombre: 'Ana',
    apellido: 'Perez',
    habitacion: 'Doble',
    entrada: '2026-11-10',
    salida: '2026-11-13',
    estado: 'Confirmada',
    total: 292000
  };

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });

    contenedor.remove();
  });

  it('muestra el código de la reserva', async () => {
    await act(async () => {
      root.render(<EstadoReserva reserva={reserva} />);
    });

    expect(contenedor.textContent).toContain('DT-797286');
  });

  it('muestra el nombre del huésped recibido por props', async () => {
    await act(async () => {
      root.render(<EstadoReserva reserva={reserva} />);
    });

    expect(contenedor.textContent).toContain('Ana Perez');
  });

  it('no muestra información si no recibe una reserva', async () => {
    await act(async () => {
      root.render(<EstadoReserva reserva={null} />);
    });

    expect(contenedor.innerHTML).toBe('');
  });

  it('muestra el total de la reserva con formato chileno', async () => {
    await act(async () => {
      root.render(<EstadoReserva reserva={reserva} />);
    });

    expect(contenedor.textContent).toContain('$292.000');
  });
});
