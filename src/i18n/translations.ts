export type Locale = 'es' | 'en' | 'ru';
export type LocalizedString = string | Partial<Record<Locale, string>>;

export const translations = {
  es: {
    eyebrow: '✈️ La aventura comienza en...',
    countdown: { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
    countdownAriaLabel: 'Cuenta regresiva para el viaje',
    departure: 'Salida',
  },
  en: {
    eyebrow: '✈️ The adventure begins in...',
    countdown: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
    countdownAriaLabel: 'Trip countdown',
    departure: 'Departure',
  },
  ru: {
    eyebrow: '✈️ Приключение начинается через...',
    countdown: { days: 'Дней', hours: 'Часов', minutes: 'Минут', seconds: 'Секунд' },
    countdownAriaLabel: 'Обратный отсчёт до поездки',
    departure: 'Отправление',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  countdown: Record<'days' | 'hours' | 'minutes' | 'seconds', string>;
  countdownAriaLabel: string;
  departure: string;
}>;

export type Translations = typeof translations[Locale];
