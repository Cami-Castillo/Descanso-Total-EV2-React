
export default function initialize() {
  const tabla = document.getElementById("tablaReservas");
  const buscarCodigo = document.getElementById("buscarCodigo");
  const filtroEstado = document.getElementById("filtroEstado");
  const mensaje = document.getElementById("mensajeReservas");

  const totalSolicitadas = document.getElementById("totalSolicitadas");
  const totalConfirmadas = document.getElementById("totalConfirmadas");
  const totalReservas = document.getElementById("totalReservas");

  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  mostrarReservas(reservas);
  actualizarContadores();

  buscarCodigo.addEventListener("input", filtrarReservas);
  filtroEstado.addEventListener("change", filtrarReservas);

  tabla.addEventListener("click", function (event) {
    const boton = event.target.closest(".btn-confirmar");

    if (!boton || !tabla.contains(boton)) {
      return;
    }

    confirmarReserva(boton.dataset.codigo);
  });

  function filtrarReservas() {
    const codigo = buscarCodigo.value.trim().toUpperCase();
    const estado = filtroEstado.value;

    const reservasFiltradas = reservas.filter(function (reserva) {
      const coincideCodigo =
        reserva.codigo.toUpperCase().includes(codigo);

      const coincideEstado =
        estado === "Todos" || reserva.estado === estado;

      return coincideCodigo && coincideEstado;
    });

    mostrarReservas(reservasFiltradas);
  }

  function mostrarReservas(lista) {
    tabla.innerHTML = "";
    mensaje.textContent = "";

    if (lista.length === 0) {
      mensaje.textContent = "No existen reservas para mostrar.";
      mensaje.className = "mt-3 text-muted";
      return;
    }

    lista.forEach(function (reserva) {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${reserva.codigo}</td>
        <td>${reserva.nombre} ${reserva.apellido}</td>
        <td>${reserva.habitacion}</td>
        <td>${reserva.entrada}</td>
        <td>${reserva.salida}</td>
        <td>${reserva.estado}</td>
        <td class="celda-accion"></td>
      `;

      const celdaAccion = fila.querySelector(".celda-accion");

      if (reserva.estado === "Solicitada") {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-success btn-sm btn-confirmar";
        boton.dataset.codigo = reserva.codigo;
        boton.textContent = "Confirmar";

        celdaAccion.appendChild(boton);
      } else {
        celdaAccion.textContent = "Sin acciones";
      }

      tabla.appendChild(fila);
    });
  }

  function confirmarReserva(codigo) {
    const indice = reservas.findIndex(function (reserva) {
      return reserva.codigo === codigo;
    });

    if (indice === -1) {
      return;
    }

    const reservaSeleccionada = reservas[indice];

    const conflicto = reservas.some(function (reserva) {
      if (reserva.codigo === reservaSeleccionada.codigo) {
        return false;
      }

      if (
        reserva.estado !== "Confirmada" &&
        reserva.estado !== "Check-in"
      ) {
        return false;
      }

      if (reserva.habitacion !== reservaSeleccionada.habitacion) {
        return false;
      }

      return fechasSeCruzan(
        reservaSeleccionada.entrada,
        reservaSeleccionada.salida,
        reserva.entrada,
        reserva.salida
      );
    });

    if (conflicto) {
      mensaje.textContent =
        "No se puede confirmar la reserva porque la habitación ya está asignada para ese período.";
      mensaje.className = "mt-3 text-danger";
      return;
    }

    reservaSeleccionada.estado = "Confirmada";

    localStorage.setItem("reservas", JSON.stringify(reservas));

    actualizarContadores();
    filtrarReservas();

    mensaje.textContent =
      "Reserva " + codigo + " confirmada correctamente.";
    mensaje.className = "mt-3 text-success";
  }

  function fechasSeCruzan(entrada1, salida1, entrada2, salida2) {
    const inicio1 = new Date(entrada1);
    const fin1 = new Date(salida1);
    const inicio2 = new Date(entrada2);
    const fin2 = new Date(salida2);

    return inicio1 < fin2 && fin1 > inicio2;
  }

  function actualizarContadores() {
    totalSolicitadas.textContent = reservas.filter(function (reserva) {
      return reserva.estado === "Solicitada";
    }).length;

    totalConfirmadas.textContent = reservas.filter(function (reserva) {
      return reserva.estado === "Confirmada";
    }).length;

    totalReservas.textContent = reservas.length;
  }
}
