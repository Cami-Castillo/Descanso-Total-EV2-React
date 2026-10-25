# Descanso Total — Evaluación Parcial 2 (React)

Proyecto académico de Hotel Descanso Total, migrado a React + Vite + Bootstrap.

## Abrir y ejecutar (Windows / VS Code)
Abre **esta carpeta (la que contiene `package.json`)** y en PowerShell ejecuta:

```powershell
npm install
npm run dev
```

Abre la dirección Local que muestre Vite, normalmente `http://localhost:5173/`.

## Pruebas unitarias Jasmine + Karma

```powershell
npm test
```

Necesitas Google Chrome instalado. Las 10 pruebas verifican catálogo, fechas, solapamiento, validación, crear, consultar, modificar y cancelar reservas. Se ejecutan en Chrome Headless. El archivo `.karma-bundle.js` se genera al lanzar Karma.

## Rutas principales
- `/rf01-disponibilidad`: disponibilidad (lógica heredada)
- `/rf02-registrar-reserva`: registro con React/useState
- `/rf03-estado-de-reserva`: consulta y edición con React/useState
- `/rf05-cancelar-reserva`: cancelación con React/useState
- Otras rutas RF04 y RF06–RF10: pantallas originales migradas y todavía con parte del JS heredado.

## Persistencia
`src/data/reservas.js`: operaciones crear, leer, actualizar y cancelar (baja lógica); localStorage con clave `reservas`. Prototipo de frontend: los datos se guardan **solo en ese navegador**, no es una reserva real ni hay autenticación, servidor o base de datos compartida.

## Alcance real y pendientes
- El catálogo refleja las 5 habitaciones y 4 servicios indicados en el caso.
- Las reservas en estados `Check-in` / `Check-out` no pueden cancelarse desde el flujo nuevo.
- Las operaciones principales de reservas tienen validación y 10 pruebas propuestas; hay que ejecutar `npm test` y registrar evidencia real.
- El resto de módulos RF04, RF06–RF10 mantienen lógica JavaScript heredada: verificar y migrar antes de declarar cumplimiento completo.
- Se necesita actualizar el ERS V2, agregar capturas de resultados de pruebas, cobertura e informar de la presentación.
- No declarar reservas sincronizadas con otros equipos: usa almacenamiento local.
