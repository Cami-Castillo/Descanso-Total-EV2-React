
export default function initialize() {
  const inputCodigo = document.getElementById("codigoCheckout");
  const botonBuscar = document.getElementById("btnBuscarCheckout");
  const mensaje = document.getElementById("mensajeCheckout");

  const detalle = document.getElementById("detalleCheckout");
  const botonRegistrar = document.getElementById("btnRegistrarCheckout");
  const resultado = document.getElementById("resultadoCheckout");

  const habitaciones = {
    "Habitación Simple": "HAB001",
    "Habitación Doble": "HAB002",
    "Habitación Superior": "HAB003",
    "Suite Ejecutiva": "HAB004",
    "Suite Presidencial": "HAB005"
  };

  let reservaActual = null;

  function obtenerHoy() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return anio + "-" + mes + "-" + dia;
  }

  function calcularNoches(entrada, salida) {
    const inicio = new Date(entrada);
    const fin = new Date(salida);

    return Math.round(
      (fin - inicio) / (1000 * 60 * 60 * 24)
    );
  }

  function dinero(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
  }

  function buscarReserva(codigo) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    return reservas.find(function (reserva) {
      return reserva.codigo.toUpperCase() === codigo;
    });
  }

  function mostrarDetalle(reserva) {
    const totalServicios = Number(reserva.totalServicios) || 0;
    const total = Number(reserva.total) || 0;
    const totalAlojamiento = total - totalServicios;

    document.getElementById("checkoutCodigo").textContent =
      reserva.codigo;

    document.getElementById("checkoutHuesped").textContent =
      reserva.nombre + " " + reserva.apellido;

    document.getElementById("checkoutHabitacion").textContent =
      reserva.habitacion;

    document.getElementById("checkoutEntrada").textContent =
      reserva.entrada;

    document.getElementById("checkoutSalida").textContent =
      reserva.salida;

    document.getElementById("checkoutEstado").textContent =
      reserva.estado;

    document.getElementById("checkoutNoches").textContent =
      calcularNoches(reserva.entrada, reserva.salida);

    document.getElementById("checkoutAlojamiento").textContent =
      dinero(totalAlojamiento);

    document.getElementById("checkoutServicios").textContent =
      dinero(totalServicios);

    document.getElementById("checkoutTotal").textContent =
      dinero(total);

    detalle.style.display = "block";
  }

  botonBuscar.addEventListener("click", function () {
    const codigo = inputCodigo.value.trim().toUpperCase();

    mensaje.textContent = "";
    resultado.textContent = "";
    detalle.style.display = "none";
    botonRegistrar.disabled = true;
    reservaActual = null;

    if (codigo === "") {
      mensaje.textContent = "Debes ingresar un código de reserva.";
      mensaje.style.color = "red";
      return;
    }

    const reserva = buscarReserva(codigo);

    if (!reserva) {
      mensaje.textContent = "No se encontró una reserva con ese código.";
      mensaje.style.color = "red";
      return;
    }

    reservaActual = reserva;

    mostrarDetalle(reserva);

    if (reserva.estado === "Check-out") {
      mensaje.textContent =
        "Esta reserva ya tiene el check-out registrado.";
      mensaje.style.color = "red";
      return;
    }

    if (reserva.estado !== "Check-in") {
      mensaje.textContent =
        "La reserva debe tener el check-in registrado.";
      mensaje.style.color = "red";
      return;
    }

    if (obtenerHoy() < reserva.salida) {
      mensaje.textContent =
        "La fecha de salida es " +
        reserva.salida +
        ". Todavía no puedes registrar el check-out.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent =
      "Reserva encontrada. Revisa el total antes de registrar el check-out.";

    mensaje.style.color = "green";
    botonRegistrar.disabled = false;
  });

  botonRegistrar.addEventListener("click", function () {
    if (!reservaActual) {
      return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const indice = reservas.findIndex(function (reserva) {
      return reserva.codigo === reservaActual.codigo;
    });

    if (indice === -1) {
      resultado.textContent = "No se encontró la reserva.";
      resultado.style.color = "red";
      return;
    }

    const reserva = reservas[indice];

    if (reserva.estado !== "Check-in") {
      resultado.textContent =
        "La reserva no está disponible para check-out.";
      resultado.style.color = "red";
      botonRegistrar.disabled = true;
      return;
    }

    if (obtenerHoy() < reserva.salida) {
      resultado.textContent =
        "No puedes registrar el check-out antes de la fecha de salida.";
      resultado.style.color = "red";
      botonRegistrar.disabled = true;
      return;
    }

    reserva.estado = "Check-out";

    localStorage.setItem(
      "reservas",
      JSON.stringify(reservas)
    );

    const codigoHabitacion = habitaciones[reserva.habitacion];

    if (codigoHabitacion) {
      const limpiezas = JSON.parse(
        localStorage.getItem("limpiezaHabitaciones")
      ) || {};

      limpiezas[codigoHabitacion] = {
        persona: "",
        estado: "Pendiente"
      };

      localStorage.setItem(
        "limpiezaHabitaciones",
        JSON.stringify(limpiezas)
      );
    }

    reservaActual = reserva;

    mostrarDetalle(reserva);
    botonRegistrar.disabled = true;

    resultado.textContent =
      "Check-out registrado correctamente. Habitación pendiente de limpieza.";

    resultado.style.color = "green";
    mensaje.textContent = "";
  });
}
