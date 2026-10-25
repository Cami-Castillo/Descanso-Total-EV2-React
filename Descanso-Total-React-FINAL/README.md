# Descanso Total — React + Vite

Proyecto frontend académico para la Evaluación Parcial 2 de Fullstack II.

## Iniciar

```bash
npm install
npm run dev
```

Abrir la URL local que muestra Vite (normalmente http://localhost:5173).

## Cambios de esta entrega

- El menú **Mi reserva** usa el JavaScript oficial de Bootstrap.
- **Seleccionar habitación** abre la ruta React de reserva con fechas, habitación y huéspedes.
- Catálogo ajustado al caso: HAB001–HAB005, capacidades, precios y estados iniciales.
- Las reservas solicitadas se guardan en `localStorage` y pueden consultarse por código.
- La búsqueda de disponibilidad contempla reservas ya guardadas y no muestra como disponibles habitaciones ocupadas o en limpieza.

## Alcance

Es una demostración de frontend: `localStorage` solo persiste datos en **este navegador**, no entre dispositivos ni de forma segura. No hay backend, autenticación ni reserva real. El caso de estudio pide privacidad por huésped, por lo que se requeriría autenticación/backend para producción.

La rúbrica solicita además 10 pruebas con Jasmine/Karma, ERS y cobertura de testing, que se deben completar/verificar antes de entregar la evaluación.
