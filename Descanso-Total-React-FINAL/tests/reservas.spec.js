
import {
  HABITACIONES,
  seCruzan,
  nochesEntre,
  validarReserva,
  crearReserva,
  buscarReserva,
  actualizarReserva,
  cancelarReserva,
  disponible,
  obtenerReservas
} from "../src/data/reservas.js";

const base = {
  nombre: "Ana",
  apellido: "Pérez",
  email: "ana@example.cl",
  telefono: "912345678",
  rut: "12345678-5",
  entrada: "2030-03-01",
  salida: "2030-03-03",
  huespedes: 2,
  habitacion: "Habitación Doble"
};

describe("Descanso Total: 10 pruebas de reservas", function () {

  beforeEach(function () {
    localStorage.clear();
  });

  it("1. Tiene cinco habitaciones en el catálogo", function () {
    expect(HABITACIONES.length).toBe(5);
  });

  it("2. Identifica superposición de fechas", function () {
    const resultado = seCruzan(
      "2030-01-01",
      "2030-01-04",
      "2030-01-03",
      "2030-01-05"
    );

    expect(resultado).toBeTrue();
  });

  it("3. Permite reservas consecutivas sin cruce", function () {
    const resultado = seCruzan(
      "2030-01-01",
      "2030-01-03",
      "2030-01-03",
      "2030-01-06"
    );

    expect(resultado).toBeFalse();
  });

  it("4. Calcula correctamente las noches", function () {
    const resultado = nochesEntre(
      "2030-03-01",
      "2030-03-03"
    );

    expect(resultado).toBe(2);
  });

  it("5. Detecta un correo electrónico inválido", function () {
    const datos = {
      ...base,
      email: "incorrecto"
    };

    const resultado = validarReserva(datos);

    expect(resultado).toContain("correo");
  });

  it("6. Impide superar la capacidad de la habitación", function () {
    const datos = {
      ...base,
      huespedes: 3
    };

    const resultado = validarReserva(datos);

    expect(resultado).toContain("capacidad");
  });

  it("7. Crea y guarda una reserva", function () {
    const reserva = crearReserva(base);

    expect(reserva.codigo).toMatch(/^DT-/);
    expect(obtenerReservas().length).toBe(1);
  });

  it("8. Busca reservas sin distinguir mayúsculas", function () {
    const reserva = crearReserva(base);

    const resultado = buscarReserva(
      reserva.codigo.toLowerCase()
    );

    expect(resultado.codigo).toBe(reserva.codigo);
  });

  it("9. Modifica una reserva y recalcula su precio", function () {
    const reserva = crearReserva(base);

    const editada = actualizarReserva(reserva.codigo, {
      salida: "2030-03-04"
    });

    expect(editada.noches).toBe(3);
    expect(editada.total).toBe(255000);
  });

  it("10. Cancela una reserva y libera su disponibilidad", function () {
    const reserva = crearReserva(base);

    const disponibleAntes = disponible(
      HABITACIONES[1],
      base.entrada,
      base.salida
    );

    expect(disponibleAntes).toBeFalse();

    cancelarReserva(reserva.codigo);

    const disponibleDespues = disponible(
      HABITACIONES[1],
      base.entrada,
      base.salida
    );

    expect(disponibleDespues).toBeTrue();
  });

  
  it('comprueba el almacenamiento utilizando un spy', () => {
    const spy = spyOn(Storage.prototype, 'setItem').and.callThrough();

    localStorage.setItem('prueba', 'Descanso Total');

    expect(spy).toHaveBeenCalledWith('prueba', 'Descanso Total');
    expect(localStorage.getItem('prueba')).toBe('Descanso Total');
  });

    it('simula el almacenamiento mediante un mock', () => {
    const guardar = spyOn(Storage.prototype, 'setItem').and.stub();

    localStorage.setItem('reservaPrueba', 'DT-123456');

    expect(guardar).toHaveBeenCalledWith(
      'reservaPrueba',
      'DT-123456'
    );

    expect(localStorage.getItem('reservaPrueba')).toBeNull();
  });


});
