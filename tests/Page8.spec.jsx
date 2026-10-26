
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import Page8 from "../src/pages/Page8.jsx";

describe("Page8 - Gestión de reservas", () => {
  let contenedor;
  let root;
  let reservasOriginales;

  beforeEach(async () => {
    reservasOriginales = localStorage.getItem("reservas");

    const reservasPrueba = [
      {
        codigo: "DT-001",
        nombre: "Ana",
        apellido: "Pérez",
        habitacion: "Habitación Simple",
        entrada: "2026-11-10",
        salida: "2026-11-12",
        estado: "Solicitada"
      },
      {
        codigo: "DT-002",
        nombre: "Pedro",
        apellido: "Soto",
        habitacion: "Habitación Doble",
        entrada: "2026-11-15",
        salida: "2026-11-18",
        estado: "Confirmada"
      }
    ];

    localStorage.setItem("reservas", JSON.stringify(reservasPrueba));

    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);

    await act(async () => {
      root.render(<Page8 />);
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

  it("muestra las reservas en la tabla", () => {
    expect(contenedor.textContent).toContain("DT-001");
    expect(contenedor.textContent).toContain("DT-002");
  });

  it("muestra Confirmar solo en reservas solicitadas", () => {
    const botones = contenedor.querySelectorAll("button.btn-success");

    expect(botones.length).toBe(1);
    expect(botones[0].textContent).toContain("Confirmar");
  });

  it("confirma una reserva y guarda el cambio", async () => {
    const boton = contenedor.querySelector("button.btn-success");

    await act(async () => {
      boton.click();
    });

    const reservas = JSON.parse(localStorage.getItem("reservas"));
    const actualizada = reservas.find(
      (reserva) => reserva.codigo === "DT-001"
    );

    expect(actualizada.estado).toBe("Confirmada");

    expect(contenedor.textContent).toContain(
      "Reserva DT-001 confirmada correctamente."
    );
  });
    it("impide confirmar reservas con fechas superpuestas", async () => {
    const reservas = [
        {
        codigo: "DT-001",
        nombre: "Ana",
        apellido: "Pérez",
        habitacion: "Habitación Simple",
        entrada: "2026-11-10",
        salida: "2026-11-12",
        estado: "Solicitada"
        },
        {
        codigo: "DT-002",
        nombre: "Pedro",
        apellido: "Soto",
        habitacion: "Habitación Simple",
        entrada: "2026-11-11",
        salida: "2026-11-13",
        estado: "Confirmada"
        }
    ];

    localStorage.setItem("reservas", JSON.stringify(reservas));

    await act(async () => {
        root.unmount();
    });

    root = createRoot(contenedor);

    await act(async () => {
        root.render(<Page8 />);
    });

    const boton = contenedor.querySelector("button.btn-success");

    await act(async () => {
        boton.click();
    });

    const guardadas = JSON.parse(localStorage.getItem("reservas"));
    const solicitada = guardadas.find((r) => r.codigo === "DT-001");

    expect(solicitada.estado).toBe("Solicitada");
    expect(contenedor.textContent).toContain(
        "No se puede confirmar la reserva porque la habitación ya está asignada"
    );
    });
});
