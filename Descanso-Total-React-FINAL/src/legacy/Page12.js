
export default function initialize() {
  const inputDesde = document.getElementById("desde");
  const inputHasta = document.getElementById("hasta");
  const boton = document.getElementById("btnGenerar");
  const textoResultado = document.getElementById("resultado");

  const seccionReporte = document.getElementById("seccionReporte");
  const tablaReportes = document.getElementById("tablaReportes");

  function dinero(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
  }

  function contarPorEstado(reservas, estado) {
    return reservas.filter(function (reserva) {
      return reserva.estado === estado;
    }).length;
  }

  function crearCelda(fila, contenido) {
    const celda = document.createElement("td");
    celda.textContent = contenido;
    fila.appendChild(celda);
  }

  function mostrarTabla(reservas) {
    tablaReportes.innerHTML = "";

    if (reservas.length === 0) {
      const fila = document.createElement("tr");
      const celda = document.createElement("td");

      celda.colSpan = 7;
      celda.textContent = "No existen reservas para este período.";
      celda.className = "text-center text-muted";

      fila.appendChild(celda);
      tablaReportes.appendChild(fila);
      return;
    }

    reservas.forEach(function (reserva) {
      const fila = document.createElement("tr");

      crearCelda(fila, reserva.codigo);
      crearCelda(fila, reserva.nombre + " " + reserva.apellido);
      crearCelda(fila, reserva.habitacion);
      crearCelda(fila, reserva.entrada);
      crearCelda(fila, reserva.salida);
      crearCelda(fila, reserva.estado);
      crearCelda(fila, dinero(reserva.total || 0));

      tablaReportes.appendChild(fila);
    });
  }

  boton.addEventListener("click", function () {
    const desde = inputDesde.value;
    const hasta = inputHasta.value;

    textoResultado.textContent = "";
    seccionReporte.style.display = "none";

    if (desde === "" || hasta === "") {
      textoResultado.textContent =
        "Debes seleccionar ambas fechas.";
      textoResultado.style.color = "red";
      return;
    }

    if (hasta < desde) {
      textoResultado.textContent =
        "La fecha final no puede ser anterior a la inicial.";
      textoResultado.style.color = "red";
      return;
    }

    const reservas = JSON.parse(
      localStorage.getItem("reservas")
    ) || [];

    const reservasFiltradas = reservas.filter(function (reserva) {
      return reserva.entrada >= desde && reserva.entrada <= hasta;
    });

    const reservasActivas = reservasFiltradas.filter(function (reserva) {
      return reserva.estado !== "Cancelada";
    });

    const totalValores = reservasActivas.reduce(
      function (acumulado, reserva) {
        return acumulado + Number(reserva.total || 0);
      },
      0
    );

    document.getElementById("reporteTotal").textContent =
      reservasFiltradas.length;

    document.getElementById("reporteConfirmadas").textContent =
      contarPorEstado(reservasFiltradas, "Confirmada");

    document.getElementById("reporteCheckin").textContent =
      contarPorEstado(reservasFiltradas, "Check-in");

    document.getElementById("reporteSolicitadas").textContent =
      contarPorEstado(reservasFiltradas, "Solicitada");

    document.getElementById("reporteCanceladas").textContent =
      contarPorEstado(reservasFiltradas, "Cancelada");

    document.getElementById("reporteCheckout").textContent =
      contarPorEstado(reservasFiltradas, "Check-out");

    document.getElementById("reporteIngresos").textContent =
      dinero(totalValores);

    mostrarTabla(reservasFiltradas);

    textoResultado.textContent =
      "Reporte generado correctamente. Se incluyen reservas cuya fecha de entrada está dentro del período.";

    textoResultado.style.color = "green";
    seccionReporte.style.display = "block";
  });
}
