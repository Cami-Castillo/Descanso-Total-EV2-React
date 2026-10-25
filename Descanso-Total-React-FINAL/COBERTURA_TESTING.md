# Documento de cobertura de testing — borrador verificable

**Asignatura:** DSY1104 Fullstack II. **Framework:** React + Vite + Bootstrap. **Herramientas:** Jasmine, Karma, Chrome Headless.

| Nº | Prueba | Resultado esperado |
|---|---|---|
| 1 | Catálogo | Cinco habitaciones |
| 2 | Solapamiento | Detecta cruce de fechas |
| 3 | Reservas consecutivas | No detecta cruce |
| 4 | Noches | Calcula diferencia exacta |
| 5 | Email incorrecto | Muestra error de validación |
| 6 | Capacidad | Impide exceder el máximo |
| 7 | Crear | Guarda y genera código |
| 8 | Consultar | Encuentra código ignorando mayúsculas |
| 9 | Actualizar | Recalcula el total |
| 10 | Cancelar | Libera disponibilidad |

**Ejecutar:** `npm install` y `npm test`. Registrar captura del resultado **real**. Este documento no afirma ejecución exitosa sin evidencia. Las pruebas cubren la capa de lógica de reservas; **no** prueban visualmente el renderizado de React ni todas las 13 pantallas. Para ampliar la cobertura deben añadirse pruebas de props, renderizado, estado y eventos en componentes React con montaje del DOM.

**Mocks/aislamiento:** se borra `localStorage` antes de cada prueba para que ninguna dependa de otra. El catálogo es un fixture estático del caso entregado. No hay servidor remoto.
