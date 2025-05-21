## 1. Diferencias entre `useMemo` y `useCallback` en React y cuándo usarlos en un proyecto con Vite que prioriza el rendimiento

- `useMemo`: memoriza el **resultado de una función**. Se usa cuando tienes cálculos que no quieres repetir si las dependencias no cambian.
- `useCallback`: memoriza la **referencia de una función**. para evitar que se regeneren funciones en cada render, especialmente cuando se pasan como props.

**En Vite**, que prioriza tiempos rápidos de desarrollo, ambos hooks ayudan a evitar renders innecesarios, pero **deben usarse con criterio**: solo cuando el rendimiento se ve afectado. Usarlos en exceso puede generar complejidad sin beneficio.

## 2. ¿Cómo maneja Zustand el estado global sin Context API y qué ventajas ofrece frente a Redux o Context en SPAs modernas?

Zustand crea un **store externo y reactivo** sin depender de `Context.Provider`. Los componentes consumen directamente el estado con hooks (`useStore`) y solo se actualizan cuando cambian las partes que usan.

**Ventajas:**
- Menor boilerplate que Redux.
- Mejor rendimiento que Context API, ya que evita renders innecesarios.
- Compatible con SSR y middlewares.
- Fácil de testear y escalar.

## 3. ¿Cómo asegura Radix UI la accesibilidad y consistencia visual, y cómo encaja con diseño atómico o componentes desacoplados?

Radix UI entrega componentes sin estilos pero con **accesibilidad incorporada (WAI-ARIA, keyboard navigation, roles)**. Esto permite integrarlos con cualquier sistema de diseño.

En arquitectura atómica:
- Puedes usar Radix como **átomos accesibles**.
- Construyes moléculas y organismos sobre ellos sin perder consistencia ni accesibilidad.

## 4. Estrategias para manejar critical CSS y evitar FOUC en Vite + Radix UI

- Usa `@import` directo en tu `index.css` para estilos base.
- Pre-renderiza el CSS crítico usando herramientas
- Configura `vite-plugin-critical` para inyectar CSS en el head.
- Usa `Radix UI Themes` o tailwind preconfigurado para evitar flash de estilos al montar.

FOUC se previene cargando estilos **lo antes posible** y evitando CSS-in-JS dinámico en el primer render.

## 5. Paso mínimo para un despliegue blue-green de una SPA (React + Vite) en AWS S3 + CloudFront

1. Genera el build: `vite build`
2. Sube la nueva versión a un **bucket S3 alternativo** (green).
3. Asigna una nueva distribución **CloudFront** o cambia el origen del actual al bucket green.
4. Invalida caché (si es necesario).
5. Cuando validas que green está ok, eliminas o dejas como fallback el bucket blue.

Este proceso permite cambio **casi instantáneo y sin downtime**, y puedes revertir fácilmente si algo falla.:D