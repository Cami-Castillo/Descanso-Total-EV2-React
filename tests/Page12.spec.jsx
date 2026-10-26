
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import Page12 from "../src/pages/Page12.jsx";

describe("Page12 - Reportes", () => {
  let contenedor;
  let root;
  let reservasOriginales;

  beforeEach(async () => {
    reservasOriginales = localStorage.getItem("reservas");

    localStorage.setItem("reservas", JSON.stringify([
      {
        codigo: "DT-101",
        nombre: "Ana",
        apellido: "Pérez",
        habitacion: "Habitación Simple",
        entrada: "2026-11-10",
        salida: "2026-11-12",
        estado: "Confirmada",
        total: 100000
      },
      {
        codigo: "DT-102",
        nombre: "Pedro",
        apellido: "Soto",
        habitacion: "Habitación Doble",
        entrada: "2026-11-15",
        salida: "2026-11-18",
        estado: "Cancelada",
        total: 80000
      }
    ]));

    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);

    await act(async () => {
      root.render(<Page12 />);
    });
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });

    contenedor.remove();

    if (reservasOriginales === null) {
      localStorage.removeItem("reservas");
    } else {
      localStorage.setItem("reservas", reservasOriginales);
    }
  });

  it("muestra un error si no se seleccionan fechas", async () => {
    const boton = contenedor.querySelector("button.btn-primary");

    await act(async () => {
      boton.click();
    });

    expect(contenedor.textContent).toContain(
      "Debes seleccionar ambas fechas."
    );
  });

  it("no muestra el reporte antes de generar", () => {
    expect(contenedor.textContent).not.toContain(
      "Detalle de reservas"
    );
  });

  it("genera un reporte para el período seleccionado", async () => {
    const desde = contenedor.querySelector("#desde");
    const hasta = contenedor.querySelector("#hasta");

    const cambiarFecha = (input, valor) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      ).set;

      setter.call(input, valor);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    await act(async () => {
      cambiarFecha(desde, "2026-11-01");
      cambiarFecha(hasta, "2026-11-30");
    });

    await act(async () => {
      contenedor.querySelector("button.btn-primary").click();
    });

    expect(contenedor.textContent).toContain("DT-101");
    expect(contenedor.textContent).toContain("DT-102");
    expect(contenedor.textContent).toContain("$100.000");
  });
});
