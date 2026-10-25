
export const HABITACIONES = [
  {
    codigo: "HAB001",
    clave: "simple",
    nombre: "Habitación Simple",
    capacidad: 1,
    precio: 65000,
    estado: "Disponible"
  },
  {
    codigo: "HAB002",
    clave: "doble",
    nombre: "Habitación Doble",
    capacidad: 2,
    precio: 85000,
    estado: "Disponible"
  },
  {
    codigo: "HAB003",
    clave: "superior",
    nombre: "Habitación Superior",
    capacidad: 2,
    precio: 120000,
    estado: "En limpieza"
  },
  {
    codigo: "HAB004",
    clave: "ejecutiva",
    nombre: "Suite Ejecutiva",
    capacidad: 3,
    precio: 180000,
    estado: "Ocupada"
  },
  {
    codigo: "HAB005",
    clave: "presidencial",
    nombre: "Suite Presidencial",
    capacidad: 4,
    precio: 350000,
    estado: "Disponible"
  }
];

export const SERVICIOS = [
  { codigo: "SE001", nombre: "Desayuno", precio: 12000 },
  { codigo: "SE002", nombre: "Spa", precio: 25000 },
  { codigo: "SE003", nombre: "Estacionamiento", precio: 10000 },
  { codigo: "SE004", nombre: "Cena", precio: 20000 }
];

const KEY = "reservas";

export function obtenerReservas() {
  try {
    const datos = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarReservas(reservas) {
  localStorage.setItem(KEY, JSON.stringify(reservas));
  return reservas;
}

export function buscarReserva(codigo) {
  return obtenerReservas().find(function (reserva) {
    return reserva.codigo?.toUpperCase() ===
      String(codigo).trim().toUpperCase();
  }) || null;
}

export function estadoHabitacion(habitacion) {
  if (!habitacion) {
    return "No disponible";
  }

  let limpiezas = {};

  try {
    limpiezas = JSON.parse(
      localStorage.getItem("limpiezaHabitaciones") || "{}"
    ) || {};
  } catch {
    limpiezas = {};
  }

  const limpieza = limpiezas[habitacion.codigo];

  if (limpieza) {
    if (limpieza.estado === "Completada") {
      if (habitacion.estado === "Ocupada") {
        return "Ocupada";
      }

      return "Disponible";
    }

    if (
      limpieza.estado === "Pendiente" ||
      limpieza.estado === "En limpieza"
    ) {
      return "En limpieza";
    }
  }

  return habitacion.estado;
}

export function seCruzan(entrada1, salida1, entrada2, salida2) {
  return entrada1 < salida2 && salida1 > entrada2;
}

export function nochesEntre(entrada, salida) {
  const fechaEntrada = Date.parse(entrada + "T12:00:00");
  const fechaSalida = Date.parse(salida + "T12:00:00");

  return Math.round(
    (fechaSalida - fechaEntrada) / 86400000
  );
}

export function disponible(
  habitacion,
  entrada,
  salida,
  ignorarCodigo = ""
) {
  if (
    !habitacion ||
    estadoHabitacion(habitacion) !== "Disponible" ||
    !entrada ||
    !salida ||
    salida <= entrada
  ) {
    return false;
  }

  return !obtenerReservas().some(function (reserva) {
    return (
      reserva.codigo !== ignorarCodigo &&
      reserva.habitacion === habitacion.nombre &&
      reserva.estado !== "Cancelada" &&
      seCruzan(
        entrada,
        salida,
        reserva.entrada,
        reserva.salida
      )
    );
  });
}

export function codigoNuevo() {
  const usados = new Set(
    obtenerReservas().map(function (reserva) {
      return reserva.codigo;
    })
  );

  let codigo;

  do {
    codigo = "DT-" + Math.floor(
      100000 + Math.random() * 900000
    );
  } while (usados.has(codigo));

  return codigo;
}

export function validarReserva(datos, fechaMinima = "0000-00-00") {
  if (
    !datos.nombre?.trim() ||
    !datos.apellido?.trim() ||
    !datos.email?.trim() ||
    !datos.telefono?.trim() ||
    !datos.rut?.trim()
  ) {
    return "Completa todos los datos de contacto.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    return "Ingresa un correo válido.";
  }

  if (!/^\d{9}$/.test(datos.telefono.replace(/\s/g, ""))) {
    return "El teléfono debe tener 9 dígitos.";
  }

  if (!/^\d{7,8}-[0-9kK]$/.test(datos.rut.trim())) {
    return "Ingresa el RUT con formato 12345678-9.";
  }

  if (
    !datos.entrada ||
    !datos.salida ||
    datos.entrada < fechaMinima ||
    !Number.isFinite(nochesEntre(datos.entrada, datos.salida)) ||
    nochesEntre(datos.entrada, datos.salida) < 1
  ) {
    return "Selecciona fechas válidas.";
  }

  if (
    !Number.isInteger(Number(datos.huespedes)) ||
    Number(datos.huespedes) < 1
  ) {
    return "Cantidad de huéspedes inválida.";
  }

  const habitacion = HABITACIONES.find(function (item) {
    return (
      item.nombre === datos.habitacion ||
      item.clave === datos.habitacion ||
      item.codigo === datos.habitacion
    );
  });

  if (!habitacion) {
    return "Habitación no encontrada.";
  }

  if (habitacion.capacidad < Number(datos.huespedes)) {
    return "La cantidad de huéspedes supera la capacidad.";
  }

  if (
    !disponible(
      habitacion,
      datos.entrada,
      datos.salida,
      datos.codigo
    )
  ) {
    return "Habitación sin disponibilidad.";
  }

  return null;
}

export function crearReserva(datos) {
  const error = validarReserva(datos);

  if (error) {
    throw new Error(error);
  }

  const habitacion = HABITACIONES.find(function (item) {
    return (
      item.nombre === datos.habitacion ||
      item.clave === datos.habitacion ||
      item.codigo === datos.habitacion
    );
  });

  const noches = nochesEntre(datos.entrada, datos.salida);

  const nueva = {
    ...datos,
    codigo: codigoNuevo(),
    habitacion: habitacion.nombre,
    precio: habitacion.precio,
    noches: noches,
    totalServicios: 0,
    servicios: [],
    total: noches * habitacion.precio,
    estado: "Solicitada"
  };

  guardarReservas([...obtenerReservas(), nueva]);

  return nueva;
}

export function actualizarReserva(codigo, cambios) {
  const anterior = buscarReserva(codigo);

  if (!anterior) {
    throw new Error("No existe esa reserva.");
  }

  if (
    ["Cancelada", "Check-in", "Check-out"].includes(anterior.estado)
  ) {
    throw new Error("Esta reserva ya no se puede editar.");
  }

  const reserva = {
    ...anterior,
    ...cambios,
    codigo: anterior.codigo
  };

  const error = validarReserva(reserva);

  if (error) {
    throw new Error(error);
  }

  const habitacion = HABITACIONES.find(function (item) {
    return (
      item.nombre === reserva.habitacion ||
      item.clave === reserva.habitacion ||
      item.codigo === reserva.habitacion
    );
  });

  reserva.habitacion = habitacion.nombre;
  reserva.precio = habitacion.precio;
  reserva.noches = nochesEntre(reserva.entrada, reserva.salida);

  reserva.total = (
    reserva.noches * habitacion.precio +
    Number(reserva.totalServicios || 0)
  );

  guardarReservas(
    obtenerReservas().map(function (item) {
      return item.codigo === anterior.codigo ? reserva : item;
    })
  );

  return reserva;
}

export function cancelarReserva(codigo) {
  const reserva = buscarReserva(codigo);

  if (!reserva) {
    throw new Error("No existe esa reserva.");
  }

  if (
    ["Check-in", "Check-out"].includes(reserva.estado)
  ) {
    throw new Error(
      "No se puede cancelar una estadía iniciada o terminada."
    );
  }

  if (reserva.estado === "Cancelada") {
    return reserva;
  }

  const cancelada = {
    ...reserva,
    estado: "Cancelada"
  };

  guardarReservas(
    obtenerReservas().map(function (item) {
      return item.codigo === reserva.codigo ? cancelada : item;
    })
  );

  return cancelada;
}
