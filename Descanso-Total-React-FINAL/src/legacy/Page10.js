
export default function initialize() {
  const inputHabitacion = document.getElementById("habitacion");
  const parrafoResultado = document.getElementById("resultado");

  const selectPersona = document.getElementById("persona");
  const botonAsignar = document.getElementById("btnAsignar");
  const parrafoResultado2 = document.getElementById("resultado2");

  const parrafoEstado = document.getElementById("estado");
  const botonCompletar = document.getElementById("btnCompletar");
  const parrafoResultado3 = document.getElementById("resultado3");

  const habitaciones = {
    HAB001: "Habitación Simple",
    HAB002: "Habitación Doble",
    HAB003: "Habitación Superior",
    HAB004: "Suite Ejecutiva",
    HAB005: "Suite Presidencial"
  };

  let limpiezas = JSON.parse(
    localStorage.getItem("limpiezaHabitaciones")
  ) || {};

  function guardarLimpiezas() {
    localStorage.setItem(
      "limpiezaHabitaciones",
      JSON.stringify(limpiezas)
    );
  }

  function mostrarHabitacion() {
    const codigo = inputHabitacion.value;

    parrafoResultado.textContent = "";
    parrafoResultado2.textContent = "";
    parrafoResultado3.textContent = "";
    selectPersona.value = "";
    botonCompletar.disabled = true;

    if (codigo === "") {
      parrafoEstado.textContent = "Selecciona una habitación";
      return;
    }

    parrafoResultado.textContent =
      codigo + " - " + habitaciones[codigo];

    parrafoResultado.style.color = "green";

    const limpieza = limpiezas[codigo];

    if (!limpieza) {
      parrafoEstado.textContent = "Pendiente";
      return;
    }

    parrafoEstado.textContent = limpieza.estado;
    selectPersona.value = limpieza.persona;

    if (limpieza.estado === "En limpieza") {
      botonCompletar.disabled = false;
    }
  }

  inputHabitacion.addEventListener("change", mostrarHabitacion);

  botonAsignar.addEventListener("click", function () {
    const codigo = inputHabitacion.value;
    const persona = selectPersona.value;

    parrafoResultado2.textContent = "";
    parrafoResultado3.textContent = "";

    if (codigo === "" || persona === "") {
      parrafoResultado2.textContent =
        "Debes seleccionar una habitación y una persona.";
      parrafoResultado2.style.color = "red";
      return;
    }

    limpiezas[codigo] = {
      persona: persona,
      estado: "En limpieza"
    };

    guardarLimpiezas();

    parrafoResultado2.textContent =
      persona + " asignado/a correctamente a " + codigo + ".";

    parrafoResultado2.style.color = "green";
    parrafoEstado.textContent = "En limpieza";
    botonCompletar.disabled = false;
  });

  botonCompletar.addEventListener("click", function () {
    const codigo = inputHabitacion.value;

    if (!codigo || !limpiezas[codigo]) {
      parrafoResultado3.textContent =
        "Primero debes asignar la limpieza.";
      parrafoResultado3.style.color = "red";
      return;
    }

    if (limpiezas[codigo].estado !== "En limpieza") {
      parrafoResultado3.textContent =
        "Esta habitación no tiene una limpieza pendiente.";
      parrafoResultado3.style.color = "red";
      return;
    }

    limpiezas[codigo].estado = "Completada";

    guardarLimpiezas();

    parrafoEstado.textContent = "Completada";
    botonCompletar.disabled = true;

    parrafoResultado3.textContent =
      "Limpieza de " + codigo + " completada correctamente.";

    parrafoResultado3.style.color = "green";
  });
}
