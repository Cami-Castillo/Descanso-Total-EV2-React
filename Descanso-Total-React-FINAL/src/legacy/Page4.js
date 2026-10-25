import { HABITACIONES, obtenerReservas, disponible, codigoNuevo } from '../data/reservas';
export default function initialize() {
const formulario = document.getElementById("reservaForm");

const nombre = document.getElementById("inputNombre");
const apellido = document.getElementById("inputApellido");
const email = document.getElementById("inputEmail");
const telefono = document.getElementById("inputTelefono");
const rut = document.getElementById("inputRut");

const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const huespedes = document.getElementById("inputHuespedes");
const habitacion = document.getElementById("inputHabitacion");
const condiciones = document.getElementById("gridCheck");

const mensaje = document.getElementById("mensajeForm");
const resumen = document.getElementById("resumenReserva");
const detalleResumen = document.getElementById("detalleResumen");

const habitaciones = Object.fromEntries(HABITACIONES.map(h=>[h.clave,h]));
const parametros = new URLSearchParams(window.location.search);
if(parametros.get('habitacion')) habitacion.value=parametros.get('habitacion');
if(parametros.get('entrada')) entrada.value=parametros.get('entrada');
if(parametros.get('salida')) salida.value=parametros.get('salida');
if(parametros.get('huespedes')) huespedes.value=parametros.get('huespedes');

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensaje.textContent = "";
    mensaje.className = "mt-4";
    resumen.style.display = "none";

    if (
        nombre.value.trim() === "" ||
        apellido.value.trim() === "" ||
        email.value.trim() === "" ||
        telefono.value.trim() === "" ||
        rut.value.trim() === "" ||
        entrada.value === "" ||
        salida.value === "" ||
        huespedes.value === "" ||
        habitacion.value === ""
    ) {
        mostrarError("Debes completar todos los campos.");
        return;
    }

    if (nombre.value.trim().length < 3) {
        mostrarError("El nombre debe tener al menos 3 caracteres.");
        return;
    }

    if (apellido.value.trim().length < 3) {
        mostrarError("El apellido debe tener al menos 3 caracteres.");
        return;
    }

    if (!validarEmail(email.value)) {
        mostrarError("Debes ingresar un correo electrónico válido.");
        return;
    }

    if (!validarTelefono(telefono.value)) {
        mostrarError("El teléfono debe contener 9 dígitos.");
        return;
    }

    if (!validarRut(rut.value)) {
        mostrarError("El RUT debe tener un formato válido. Ej: 20123456-7");
        return;
    }

    if (salida.value <= entrada.value || entrada.value < new Date().toLocaleDateString("en-CA")) {
        mostrarError("Ingresa fechas válidas: la entrada no puede ser anterior a hoy y la salida debe ser posterior.");
        return;
    }

    if (Number(huespedes.value) < 1) {
        mostrarError("Debes ingresar al menos un huésped.");
        return;
    }

    if (!condiciones.checked) {
        mostrarError("Debes aceptar los términos y condiciones.");
        return;
    }

    const habitacionSeleccionada = habitaciones[habitacion.value];

    if (Number(huespedes.value) > habitacionSeleccionada.capacidad) {
        mostrarError("La habitación seleccionada no tiene capacidad suficiente.");
        return;
    }

    if (!disponible(habitacionSeleccionada, entrada.value, salida.value)) {
        mostrarError("La habitación seleccionada no está disponible para esas fechas.");
        return;
    }

    const codigo = codigoNuevo();

    const fechaEntrada = new Date(entrada.value + "T00:00:00");
    const fechaSalida = new Date(salida.value + "T00:00:00");

    const diferencia = fechaSalida - fechaEntrada;
    const noches = diferencia / (1000 * 60 * 60 * 24);

    const total = noches * habitacionSeleccionada.precio;

    const reserva = {
        codigo: codigo,
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        email: email.value.trim(),
        telefono: telefono.value.trim(),
        rut: rut.value.trim(),
        entrada: entrada.value,
        salida: salida.value,
        huespedes: Number(huespedes.value),
        habitacion: habitacionSeleccionada.nombre,
        precio: habitacionSeleccionada.precio,
        noches: noches,
        total: total,
        estado: "Solicitada"
    };

    guardarReserva(reserva);

    mensaje.textContent = "Reserva solicitada correctamente.";
    mensaje.className = "mt-4 text-success";

    detalleResumen.innerHTML = `
        <p><strong>Código de reserva:</strong> ${reserva.codigo}</p>
        <p><strong>Huésped:</strong> ${reserva.nombre} ${reserva.apellido}</p>
        <p><strong>Habitación:</strong> ${reserva.habitacion}</p>
        <p><strong>Fecha de entrada:</strong> ${reserva.entrada}</p>
        <p><strong>Fecha de salida:</strong> ${reserva.salida}</p>
        <p><strong>Cantidad de huéspedes:</strong> ${reserva.huespedes}</p>
        <p><strong>Noches:</strong> ${reserva.noches}</p>
        <p><strong>Precio por noche:</strong> $${reserva.precio.toLocaleString("es-CL")}</p>
        <p><strong>Total estimado:</strong> $${reserva.total.toLocaleString("es-CL")}</p>
        <p><strong>Estado:</strong> ${reserva.estado}</p>
    `;

    resumen.style.display = "block";
});

function validarEmail(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarTelefono(numero) {
    return /^\d{9}$/.test(numero);
}

function validarRut(rut) {
    return /^\d{7,8}-[\dkK]$/.test(rut);
}

function guardarReserva(reserva) {

    let reservas = obtenerReservas();

    reservas.push(reserva);

    localStorage.setItem("reservas", JSON.stringify(reservas));
}

function mostrarError(texto) {
    mensaje.textContent = texto;
    mensaje.className = "mt-4 text-danger";
}
}
