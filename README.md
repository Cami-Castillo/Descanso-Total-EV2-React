# 🏨 Descanso Total — Sistema de Gestión Hotelera

**DUOC UC | Ingeniería en Informática | Fullstack II**

**Evaluación Parcial 2 — Octubre 2026**

Aplicación web desarrollada con React para apoyar la gestión de reservas y los procesos operativos del **Hotel Descanso Total**, ubicado en Viña del Mar, Chile.

El proyecto permite consultar habitaciones disponibles, registrar y administrar reservas, gestionar servicios adicionales, realizar check-in y check-out, controlar la limpieza de habitaciones y generar reportes administrativos.

## 1. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de interfaces mediante componentes |
| JavaScript | Validaciones, cálculos y lógica del sistema |
| Vite | Entorno de desarrollo y compilación |
| Bootstrap 5.3 | Diseño responsivo |
| HTML5 y CSS3 | Estructura y estilos |
| localStorage | Almacenamiento local de reservas y limpieza |
| Jasmine | Pruebas automatizadas |
| Karma | Ejecución de pruebas en el navegador |
| Istanbul | Medición de cobertura de código |
| Git y GitHub | Control de versiones |

## 2. Funcionalidades del sistema

El proyecto contempla diez requisitos funcionales:

| Código | Funcionalidad | Descripción |
|---|---|---|
| RF01 | Disponibilidad | Consulta de habitaciones disponibles según fechas y capacidad. |
| RF02 | Registro de reservas | Registro de huéspedes y generación de reservas. |
| RF03 | Consulta y modificación | Búsqueda y actualización de reservas existentes. |
| RF04 | Servicios adicionales | Incorporación de servicios y actualización de montos. |
| RF05 | Cancelación | Cancelación de reservas según su estado. |
| RF06 | Gestión de reservas | Consulta, filtrado y confirmación de solicitudes. |
| RF07 | Check-in | Registro de ingreso con validación de fechas y estado. |
| RF08 | Limpieza | Gestión de tareas y estados de limpieza de habitaciones. |
| RF09 | Check-out y cobros | Registro de salida, cálculo del total y actualización del estado de limpieza. |
| RF10 | Reportes | Generación de reportes por período y estado de reservas. |

### Área pública

Los huéspedes pueden consultar disponibilidad, registrar reservas, acceder a sus datos, solicitar servicios adicionales y cancelar reservas cuando corresponda.

### Portal privado

El personal del hotel puede administrar reservas, registrar check-in y check-out, actualizar tareas de limpieza y consultar reportes.

El portal privado forma parte del prototipo y no cuenta con autenticación real.

## 3. Instalación y ejecución

### Requisitos previos

- Node.js y npm instalados.
- Visual Studio Code u otro editor de código.
- Navegador web moderno.

### Clonar el repositorio

```bash
git clone https://github.com/Cami-Castillo/Descanso-Total-EV2-React.git
```

### Ingresar al proyecto

```bash
cd Descanso-Total-EV2-React
```

### Instalar dependencias

```bash
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección local que indique Vite, generalmente:

`http://localhost:5173`

### Generar versión de producción

```bash
npm run build
```

## 4. Estructura del proyecto

```text
Descanso-Total-EV2-React/
│
├── public/
│   └── styles/             # Estilos de las páginas
│
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── NavbarAdmin.jsx
│   │   └── EstadoReserva.jsx
│   │
│   ├── data/
│   │   └── reservas.js     # Lógica de reservas
│   │
│   ├── pages/              # Páginas públicas y administrativas
│   │   ├── Page0.jsx
│   │   ├── ...
│   │   └── Page12.jsx
│   │
│   ├── App.jsx
│   ├── index.jsx
│   └── styles-reserva.css
│
├── tests/
│   ├── reservas.spec.js
│   ├── EstadoReserva.spec.jsx
│   ├── Navbar.spec.jsx
│   ├── Page4.spec.jsx
│   ├── Page8.spec.jsx
│   ├── Page12.spec.jsx
│   └── index.js
│
├── index.html
├── karma.conf.cjs
├── package.json
└── README.md
```

## 5. Almacenamiento de datos

Para esta evaluación se utiliza `localStorage` como mecanismo de persistencia local.

Se almacenan principalmente:

- Reservas y sus estados.
- Información de huéspedes.
- Fechas de entrada y salida.
- Valores de alojamiento y servicios.
- Estados de limpieza de habitaciones.

Los datos permanecen en el navegador utilizado, incluso después de recargar la página, mientras no se elimine su almacenamiento.

**Importante:** esta versión no utiliza una base de datos ni un servidor backend.

## 6. Pruebas automatizadas

El proyecto utiliza **Jasmine y Karma** para ejecutar pruebas automatizadas de la lógica de reservas, los componentes React y las páginas del sistema.

Para ejecutar las pruebas:

```bash
npm test
```

### Últimos resultados

**Fecha:** 25 de octubre de 2026

**Navegador:** ChromeHeadless

**Resultado:** 33 pruebas ejecutadas y 33 exitosas.

```text
TOTAL: 33 SUCCESS
```

### Cobertura de código

La cobertura fue medida mediante Istanbul.

| Indicador | Cobertura |
|---|---:|
| Sentencias | 74,12 % |
| Ramas | 60,69 % |
| Funciones | 85,33 % |
| Líneas | 73,83 % |

Estos porcentajes corresponden a los archivos instrumentados durante las pruebas automatizadas y no necesariamente a la totalidad del sistema.

Para consultar el informe detallado, después de ejecutar las pruebas se puede abrir:

`coverage/index.html`

### Casos evaluados

Las pruebas incluyen validación de reservas, renderizado de componentes, eventos, gestión de estados, confirmación de reservas, detección de conflictos de fechas y generación de reportes.

También se realizaron pruebas funcionales manuales sobre los requisitos RF01 al RF10, incluyendo la comprobación del check-out y su integración con el módulo de limpieza.

## 7. Validaciones importantes

El sistema incorpora controles para:

- Evitar fechas incorrectas al registrar reservas.
- Verificar disponibilidad y capacidad de habitaciones.
- Evitar confirmar reservas superpuestas para una misma habitación.
- Impedir el check-out antes de la fecha correspondiente.
- Evitar registrar dos veces el check-out.
- Actualizar la habitación a estado **Pendiente de limpieza** después de la salida.
- Validar los períodos seleccionados para generar reportes.

## 8. Limitaciones del proyecto

Descanso Total corresponde a un **prototipo académico frontend**.

Por lo tanto:

- No incluye autenticación real de usuarios.
- No utiliza una base de datos centralizada.
- No sincroniza datos entre navegadores o dispositivos.
- No procesa pagos reales ni genera documentos tributarios.
- Utiliza datos ficticios para desarrollo y pruebas.

Estas funcionalidades pueden incorporarse en futuras versiones del sistema.

## 9. Documentación

La documentación del proyecto contempla:

- **ERS versión 2.0:** Especificación de Requisitos de Software.
- **Documento de Testing y Evidencias:** Resultados de las pruebas automatizadas, funcionales y cobertura de código.
- **Planilla de Requerimientos:** Identificación y descripción de los requisitos funcionales.

## 10. Equipo de desarrollo

**DUOC UC — Ingeniería en Informática**

**Asignatura:** Fullstack II

**Integrantes:**
- Camila Castillo
- Rubén Espejo
- Benjamín Romero

**Año:** 2026

---

**Hotel Descanso Total — Viña del Mar, Chile**

*Proyecto académico desarrollado para la Evaluación Parcial 2 de Fullstack II.*