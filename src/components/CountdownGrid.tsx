import { CountdownCard } from './CountdownCard';
import { CelebrationOverlay } from './CelebrationOverlay';
import { useCountdown } from '../hooks/useCountdown';
import { VacationConfig } from '../types/config';
import { translations, Locale } from '../i18n/translations';
import { localize } from '../i18n/localize';

interface Props {
  config: VacationConfig;
}

const UNIT_KEYS = ['days', 'hours', 'minutes', 'seconds'] as const;

export function CountdownGrid({ config }: Props) {
  const time = useCountdown(config.departureDate);
  const locale: Locale = config.language ?? 'es';
  const t = translations[locale];

  if (time.isExpired) {
    return <CelebrationOverlay message={localize(config.completionMessage, locale)} />;
  }

  return (
    <div
      className="countdown-grid"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={t.countdownAriaLabel}
    >
      {UNIT_KEYS.map((key) => (
        <CountdownCard key={key} value={time[key]} label={t.countdown[key]} />
      ))}
    </div>
  );
}
