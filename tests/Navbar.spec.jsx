
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Navbar from '../src/components/Navbar.jsx';

describe('Componente Navbar', () => {
  let contenedor;
  let root;

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

  it('muestra los enlaces de navegación', async () => {
    await act(async () => {
      root.render(<Navbar />);
    });

    expect(contenedor.textContent).toContain('Inicio');
    expect(contenedor.textContent).toContain('Habitaciones');
    expect(contenedor.textContent).toContain('Reservar');
  });

  it('abre el menú Mi reserva al hacer clic', async () => {
    await act(async () => {
      root.render(<Navbar />);
    });

    const boton = contenedor.querySelector(
      'button[aria-controls="menuReserva"]'
    );

    await act(async () => {
      boton.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(
      contenedor.querySelector('#menuReserva').classList.contains('show')
    ).toBe(true);
  });

  it('cierra el menú Mi reserva al hacer otro clic', async () => {
    await act(async () => {
      root.render(<Navbar />);
    });

    const boton = contenedor.querySelector(
      'button[aria-controls="menuReserva"]'
    );

    await act(async () => {
      boton.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('true');

    await act(async () => {
      boton.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('false');
    expect(
      contenedor.querySelector('#menuReserva').classList.contains('show')
    ).toBe(false);
  });

  it('abre el menú principal al presionar el botón móvil', async () => {
    await act(async () => {
      root.render(<Navbar />);
    });

    const boton = contenedor.querySelector('.navbar-toggler');

    await act(async () => {
      boton.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(
      contenedor.querySelector('.navbar-collapse').classList.contains('show')
    ).toBe(true);
  });

  
    
    it('cierra los menús al seleccionar un enlace', async () => {
    await act(async () => {
        root.render(<Navbar />);
    });

    const boton = contenedor.querySelector(
        'button[aria-controls="menuReserva"]'
    );

    await act(async () => {
        boton.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('true');

    const enlace = contenedor.querySelector(
        'a[href="/rf03-estado-de-reserva"]'
    );

    const evitarNavegacion = (evento) => evento.preventDefault();
    enlace.addEventListener('click', evitarNavegacion);

    await act(async () => {
        enlace.click();
    });

    expect(boton.getAttribute('aria-expanded')).toBe('false');

    enlace.removeEventListener('click', evitarNavegacion);
    });


});
