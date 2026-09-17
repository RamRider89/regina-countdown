import { CountdownCard } from './CountdownCard';
import { CelebrationOverlay } from './CelebrationOverlay';
import { useCountdown } from '../hooks/useCountdown';
import { VacationConfig } from '../types/config';

interface Props {
  config: VacationConfig;
}

const UNITS = [
  { key: 'days'    as const, label: 'Días' },
  { key: 'hours'   as const, label: 'Horas' },
  { key: 'minutes' as const, label: 'Minutos' },
  { key: 'seconds' as const, label: 'Segundos' },
];

export function CountdownGrid({ config }: Props) {
  const time = useCountdown(config.departureDate);

  if (time.isExpired) {
    return <CelebrationOverlay message={config.completionMessage} />;
  }

  return (
    <div
      className="countdown-grid"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Cuenta regresiva para el viaje"
    >
      {UNITS.map(({ key, label }) => (
        <CountdownCard key={key} value={time[key]} label={label} />
      ))}
    </div>
  );
}
