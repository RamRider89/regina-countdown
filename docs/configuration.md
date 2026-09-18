# Referencia de config.json

Archivo: `public/config.json` — se carga en runtime, **sin recompilar**.

## Ejemplo completo

```json
{
  "tripName": {
    "es": "Vacaciones en México",
    "en": "Mexico Vacation",
    "ru": "Отпуск в Мексике"
  },
  "subtitle": {
    "es": "Preparándonos para una nueva aventura",
    "en": "Getting ready for a new adventure",
    "ru": "Готовимся к новому приключению"
  },
  "departureDate": "2026-10-21T22:40:00Z",
  "timezone": "Europe/Moscow",
  "language": "ru",
  "timezones": [
    { "label": "Москва",  "tz": "Europe/Moscow" },
    { "label": "México",  "tz": "America/Mexico_City" }
  ],
  "destination": "Cancún, México",
  "destinationImage": "/images/mexico.webp",
  "participants": [
    { "name": "Carlos", "avatar": "https://media.giphy.com/media/niqMm1JmwVXkg7aCjM/giphy.webp" },
    { "name": "Regina", "avatar": "https://media.giphy.com/media/ufaVXKvdElqVPed2rz/giphy.webp" }
  ],
  "theme": {
    "primaryColor": "#0078D8",
    "secondaryColor": "#F5C040",
    "accentColor": "#00C8F0"
  },
  "backgroundImage": "/images/beach-long.webp",
  "backgroundVideo": "/videos/beach-long-r2.mp4",
  "backgroundVideoMobile": "/videos/beach-long-r2.mp4",
  "stickers": [
    "https://media.giphy.com/media/jQEoQirqCJF3wukoPW/giphy.webp"
  ],
  "gallery": ["/images/beach-1.webp", "/images/beach-2.webp"],
  "completionMessage": {
    "es": "🎉 ¡Llegó el gran día! Es momento de comenzar la aventura.",
    "en": "🎉 The big day is here! Time to start the adventure.",
    "ru": "🎉 Великий день настал! Пора начинать приключение."
  }
}
```

## Campos

### Obligatorios

| Campo | Tipo | Descripción |
|---|---|---|
| `tripName` | `LocalizedString` | Título principal del countdown |
| `subtitle` | `LocalizedString` | Subtítulo bajo el título |
| `departureDate` | `string` (ISO 8601) | Fecha/hora de salida. **Siempre con Z o zona** para evitar ambigüedad |
| `destination` | `string` | Nombre del destino (texto) |
| `participants` | `Participant[]` | Lista de viajeros |
| `theme` | `VacationTheme` | Colores principales |
| `completionMessage` | `LocalizedString` | Mensaje cuando el countdown llega a cero |

### Opcionales

| Campo | Tipo | Default | Descripción |
|---|---|---|---|
| `timezone` | `string` (IANA) | — | Zona horaria de referencia (no afecta countdown, solo display) |
| `language` | `'es' \| 'en' \| 'ru'` | `'es'` | Idioma activo de la UI |
| `timezones` | `TimezoneEntry[]` | `[]` | Horas de salida por ciudad en DepartureTimezones |
| `destinationImage` | `string` (URL o path) | — | Imagen en DestinationCard |
| `backgroundImage` | `string` | — | Poster del video y fallback cuando autoplay falla (ej: iOS Low Power Mode) |
| `backgroundVideo` | `string` | — | Video de fondo desktop/tablet |
| `backgroundVideoMobile` | `string` | — | Video de fondo mobile. Si igual a `backgroundVideo`, usa el mismo archivo |
| `stickers` | `string[]` | `[]` | URLs de stickers Giphy (.webp) para FloatingStickers |
| `gallery` | `string[]` | `[]` | URLs de fotos para PhotoGallery |

## Tipos

### LocalizedString

```ts
type LocalizedString = string | Partial<Record<'es' | 'en' | 'ru', string>>
```

Puede ser string plano (backward-compatible) o un objeto con traducciones.
El idioma activo se selecciona con `language`. Fallback: `es → en → ru`.

### Participant

```ts
{ name: string; avatar?: string }
```

`avatar` acepta URL de Giphy `.webp` (fondo transparente) o cualquier imagen.
Si no se proporciona, muestra ícono `UserCircle` (lucide-react).

### VacationTheme

```ts
{ primaryColor: string; secondaryColor: string; accentColor: string }
```

Todos deben ser colores hex CSS (`#RGB`, `#RRGGBB`, `#RRGGBBAA`).
Se aplican como CSS custom properties en `:root`.

### TimezoneEntry

```ts
{ label: string; tz: string }
```

`tz` debe ser un timezone IANA válido (ej: `Europe/Moscow`, `America/Mexico_City`).

## Advertencias

- `departureDate` sin sufijo de zona (`2026-10-22T01:40:00`) se interpreta como hora **local del browser**. Siempre usar `Z` o offset explícito.
- `stickers` y `avatar` de participantes comparten pool — el código filtra avatares del pool de stickers para evitar duplicados.
- Los campos `primaryColor`, `secondaryColor`, `accentColor` son validados contra `/^#[0-9a-fA-F]{3,8}$/`. Valores inválidos lanzan error en `useConfig`.
