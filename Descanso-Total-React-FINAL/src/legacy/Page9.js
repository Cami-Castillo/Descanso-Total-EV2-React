
export default function initialize() {
  const inputTexto = document.getElementById("codigo");
  const boton = document.getElementById("btnValidar");
  const parrafoResultado = document.getElementById("resultado");

  const inputTexto2 = document.getElementById("registro");
  const botonRegistrar = document.getElementById("btnRegistrar");
  const parrafoResultado2 = document.getElementById("resultado2");

  const confirmarHabitacion = document.createElement("label");
  confirmarHabitacion.className = "d-block mt-3";
  confirmarHabitacion.innerHTML = `
    <input type="checkbox" id="habitacionLista">
    Confirmo que la habitación está limpia y lista
  `;

  botonRegistrar.closest(".row").after(confirmarHabitacion);

  const habitacionLista = document.getElementById("habitacionLista");

  function buscarReserva(codigo) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    return reservas.find(function (reserva) {
      return reserva.codigo.toUpperCase() === codigo.toUpperCase();
    });
  }

  function validarFecha(reserva) {
    const hoy = new Date().toLocaleDateString("en-CA");
    const entrada = reserva.entrada;
    const salida = reserva.salida;

    return hoy >= entrada && hoy < salida;
  }

  boton.addEventListener("click", function () {
    const codigo = inputTexto.value.trim().toUpperCase();
    const reserva = buscarReserva(codigo);

    habitacionLista.checked = false;
    inputTexto2.value = "";
    parrafoResultado2.textContent = "";

    if (!reserva) {
      parrafoResultado.textContent =
        "No se encontró una reserva con ese código.";
      parrafoResultado.style.color = "red";
      return;
    }

    if (reserva.estado !== "Confirmada") {
      parrafoResultado.textContent =
        "La reserva debe estar confirmada y sin check-in previo.";
      parrafoResultado.style.color = "red";
      return;
    }

    if (!validarFecha(reserva)) {
      parrafoResultado.textContent =
        "El check-in solo puede realizarse desde el día de entrada y antes de la salida.";
      parrafoResultado.style.color = "red";
      return;
    }

    parrafoResultado.textContent =
      "Reserva válida. Huésped: " +
      reserva.nombre +
      " " +
      reserva.apellido +
      ". Habitación: " +
      reserva.habitacion +
      ".";

    parrafoResultado.style.color = "green";
    inputTexto2.value = reserva.codigo;
  });

  botonRegistrar.addEventListener("click", function () {
    const codigo = inputTexto2.value.trim().toUpperCase();
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const indice = reservas.findIndex(function (reserva) {
      return reserva.codigo.toUpperCase() === codigo;
    });

    if (indice === -1) {
      parrafoResultado2.textContent =
        "No se encontró una reserva con ese código.";
      parrafoResultado2.style.color = "red";
      return;
    }

    const reserva = reservas[indice];

    if (reserva.estado !== "Confirmada") {
      parrafoResultado2.textContent =
        "Solo puedes registrar el check-in de una reserva confirmada.";
      parrafoResultado2.style.color = "red";
      return;
    }

    if (!validarFecha(reserva)) {
      parrafoResultado2.textContent =
        "No puedes registrar el check-in fuera de las fechas de la reserva.";
      parrafoResultado2.style.color = "red";
      return;
    }

    if (!habitacionLista.checked) {
      parrafoResultado2.textContent =
        "Debes confirmar que la habitación está lista.";
      parrafoResultado2.style.color = "red";
      return;
    }

    reserva.estado = "Check-in";

    localStorage.setItem("reservas", JSON.stringify(reservas));

    parrafoResultado2.textContent =
      "Check-in registrado exitosamente para " +
      reserva.nombre +
      " " +
      reserva.apellido +
      ".";

    parrafoResultado2.style.color = "green";
    habitacionLista.checked = false;
    inputTexto2.value = "";
  });
}
