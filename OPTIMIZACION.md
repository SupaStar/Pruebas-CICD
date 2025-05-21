## Problema identificado

En una app de envío de remesas, los usuarios experimentaban lentitud al seleccionar países y monedas al preparar una transacción. El formulario de envío incluía múltiples listas desplegables (país, moneda, banco), y al cambiar una opción, todo el formulario se re-renderizaba.

## Análisis y diagnóstico

Utilizando las React DevTools y el profiler, observé que el componente `SendMoneyForm` se re-renderizaba completamente incluso cuando el cambio afectaba solo a un select. Esto generaba retardos perceptibles en dispositivos móviles, especialmente cuando la lista de bancos por país era extensa (más de 1000 entradas).

## Solución implementada

1. **Separé componentes**: creé componentes específicos para `<CountrySelect />`, `<CurrencySelect />` y `<BankSelect />`, con `React.memo`.
2. Usé Zustand para extraer y centralizar el estado seleccionado (`country`, `currency`) y evitar que pasara como props innecesarias.
3. Memoricé funciones y listas derivadas con `useCallback` y `useMemo`.

### Fragmento de código optimizado

```tsx
const availableBanks = useMemo(() => {
  return banks.filter(b => b.countryCode === selectedCountry);
}, [banks, selectedCountry]);
```

## Métricas antes y después

- Tiempo de respuesta al cambiar país: **~500ms ➜ ~30ms**
- Re-renders del formulario completo: **3-5 ➜ solo los selects afectados**
- Mejora de rendimiento en móviles gama media: **fluidez notable**

## Lecciones aprendidas

- Separar componentes y manejar el estado global evita renders innecesarios.
- En apps con muchas relaciones dinámicas, usar `useMemo` y `React.memo` marca una gran diferencia.
- Herramientas como profiler y logs de render son claves para detectar cuellos de botella reales.

