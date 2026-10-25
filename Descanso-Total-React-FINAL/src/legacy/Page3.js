import { HABITACIONES, disponible } from '../data/reservas';
export default function initialize() {
const habitaciones = HABITACIONES;

const formulario = document.getElementById("formDisponibilidad");
const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const personas = document.getElementById("personas");

const resultados = document.getElementById("resultados");
const listaHabitaciones = document.getElementById("listaHabitaciones");
const mensaje = document.getElementById("mensajeSinResultados");

resultados.style.display = "none";

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const fechaEntrada = entrada.value;
    const fechaSalida = salida.value;
    const cantidadPersonas = personas.value;

    listaHabitaciones.innerHTML = "";
    mensaje.textContent = "";
    resultados.style.display = "none";

    if (
        fechaEntrada === "" ||
        fechaSalida === "" ||
        cantidadPersonas === ""
    ) {
        mensaje.textContent =
            "Debes ingresar ambas fechas y la cantidad de personas.";

        resultados.style.display = "block";
        return;
    }

    if (fechaSalida <= fechaEntrada) {
        mensaje.textContent =
            "La fecha de salida debe ser posterior a la fecha de entrada.";

        resultados.style.display = "block";
        return;
    }

    const cantidad = Number(cantidadPersonas);

    const habitacionesDisponibles = habitaciones.filter(function(habitacion) {

        const capacidadCorrecta =
            habitacion.capacidad >= cantidad;

        const puedeReservar = disponible(habitacion, fechaEntrada, fechaSalida);

        return capacidadCorrecta && puedeReservar;
    });

    resultados.style.display = "block";

    if (habitacionesDisponibles.length === 0) {
        mensaje.textContent =
            "No existen habitaciones disponibles para las fechas y cantidad de personas seleccionadas.";

        return;
    }

    mensaje.textContent =
        "Se encontraron " +
        habitacionesDisponibles.length +
        " habitación(es) disponible(s).";

    habitacionesDisponibles.forEach(function(habitacion) {

        listaHabitaciones.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">

                        <h3 class="card-title">
                            ${habitacion.nombre}
                        </h3>

                        <p>
                            <strong>Capacidad:</strong>
                            ${habitacion.capacidad} huésped(es)
                        </p>

                        <p>
                            <strong>Precio por noche:</strong>
                            $${habitacion.precio.toLocaleString("es-CL")}
                        </p>

                        <p class="text-success">
                            Disponible para las fechas seleccionadas
                        </p>

                        <a
                            href="/rf02-registrar-reserva?habitacion=${habitacion.clave}&entrada=${fechaEntrada}&salida=${fechaSalida}&huespedes=${cantidad}"
                            class="btn btn-primary">
                            Seleccionar habitación
                        </a>

                    </div>
                </div>
            </div>
        `;
    });
});

}
