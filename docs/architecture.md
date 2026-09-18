# Arquitectura

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Runtime | Node 22 (vía nvm) |
| Tests | Vitest 2 + Testing Library |
| Deploy | Azure Static Web Apps (Free tier) |

## Estructura de archivos

```
src/
  types/
    config.ts          # VacationConfig, TimeRemaining, Participant, etc.
  i18n/
    translations.ts    # Diccionario UI (es/en/ru) + tipos Locale, LocalizedString
    localize.ts        # localize(value, locale) — resuelve LocalizedString a string
  hooks/
    useConfig.ts       # GET /config.json → valida → VacationConfig
    useCountdown.ts    # setInterval → TimeRemaining (days/hours/minutes/seconds)
  components/
    Hero.tsx           # Raíz visual: fondo video/img, FloatingStickers, todo el layout
    CountdownGrid.tsx  # 4 cards + mensaje de expiración
    CountdownCard.tsx  # Card individual: valor + unidad
    CtaButton.tsx      # Botón externo con primaryColor
    FloatingStickers.tsx  # Stickers Giphy con spawn/despawn aleatorio
    DepartureTimezones.tsx # Hora de salida por ciudad (Intl.DateTimeFormat)
    DestinationCard.tsx    # Imagen del destino + nombre
    TravelersGallery.tsx   # Cards de participantes con avatar o ícono
    CelebrationOverlay.tsx # Confetti (canvas-confetti) al expirar
    PhotoGallery.tsx       # Grid de galería
  App.tsx              # Root: carga config, aplica CSS vars, renderiza Hero
  index.css            # Todos los estilos (glassmorphism, animaciones, responsive)
  main.tsx             # Entry point React

public/
  config.json          # Configuración en runtime — editar sin recompilar
  images/              # Imágenes en WebP
  videos/              # Videos MP4

.github/
  workflows/
    azure-deploy.yml   # CI/CD: test → build → deploy en push/PR a main
```

## Flujo de datos

```
App.tsx
  └─ useConfig()         ← GET /config.json (runtime, no baked in build)
       └─ validateConfig()  ← valida campos requeridos, fechas, colores hex
  └─ Hero({ config })
       ├─ FloatingStickers({ pool: config.stickers })
       ├─ useCountdown(config.departureDate)  ← setInterval 1s
       ├─ CountdownGrid({ remaining, locale })
       │    └─ CountdownCard × 4
       ├─ DepartureTimezones({ timezones: config.timezones })
       ├─ DestinationCard({ destination, destinationImage })
       ├─ TravelersGallery({ participants })
       └─ CelebrationOverlay (cuando isExpired)
```

## Regla de configuración

**Nunca** importar valores de usuario desde `import.meta.env` o constantes en `src/`.
Todo lo configurable vive en `public/config.json` y se carga en runtime con `useConfig`.
Esto permite cambiar fechas, idioma, colores, URLs sin recompilar.

## LocalizedString

```ts
type LocalizedString = string | Partial<Record<Locale, string>>
// Ejemplos válidos:
"Vacaciones en México"
{ es: "Vacaciones en México", en: "Mexico Vacation", ru: "Отпуск в Мексике" }
{ ru: "Отпуск в Мексике" }  // fallback: es → en → ru
```

El helper `localize(value, locale)` resuelve a string con fallback es→en→ru.
