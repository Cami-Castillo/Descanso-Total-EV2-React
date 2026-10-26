
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Page4 from '../src/pages/Page4.jsx';

describe('Formulario de reservas Page4', () => {
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

  it('muestra los campos del formulario', async () => {
    await act(async () => {
      root.render(<Page4 />);
    });

    expect(contenedor.querySelector('#res-nombre')).not.toBeNull();
    expect(contenedor.querySelector('#res-email')).not.toBeNull();
    expect(contenedor.querySelector('#res-entrada')).not.toBeNull();
  });

  it('muestra un error al enviar el formulario vacío', async () => {
    await act(async () => {
      root.render(<Page4 />);
    });

    const formulario = contenedor.querySelector('form');

    await act(async () => {
      formulario.dispatchEvent(
        new Event('submit', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    const error = contenedor.querySelector('[role="alert"]');

    expect(error).not.toBeNull();
    expect(error.textContent).toContain(
      'Completa todos los datos de contacto y las fechas.'
    );
  });

    
    it('actualiza el nombre cuando el usuario escribe', async () => {
    await act(async () => {
        root.render(<Page4 />);
    });

    const input = contenedor.querySelector('#res-nombre');

    await act(async () => {
        const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
        ).set;

        setter.call(input, 'Camila');

        input.dispatchEvent(
        new Event('input', { bubbles: true })
        );
    });

    expect(input.value).toBe('Camila');
    });

    
    it('conserva el nombre después de actualizar el componente', async () => {
    await act(async () => {
        root.render(<Page4 />);
    });

    const input = contenedor.querySelector('#res-nombre');

    await act(async () => {
        const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
        ).set;

        setter.call(input, 'Camila');

        input.dispatchEvent(
        new Event('input', { bubbles: true })
        );
    });

    await act(async () => {
        root.render(<Page4 />);
    });

    expect(contenedor.querySelector('#res-nombre').value).toBe('Camila');
    });


});
