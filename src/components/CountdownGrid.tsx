import { CountdownCard } from './CountdownCard';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownConfig } from '../types/config';

interface Props {
  config: CountdownConfig;
}

const UNITS = [
  { key: 'days'    as const, label: 'Días' },
  { key: 'hours'   as const, label: 'Horas' },
  { key: 'minutes' as const, label: 'Minutos' },
  { key: 'seconds' as const, label: 'Segundos' },
];

export function CountdownGrid({ config }: Props) {
  const time = useCountdown(config.targetDate);

  if (time.isExpired) {
    return <p className="completion-message">{config.completionMessage}</p>;
  }

  return (
    <div
      className="countdown-grid"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Cuenta regresiva"
    >
      {UNITS.map(({ key, label }) => (
        <CountdownCard key={key} value={time[key]} label={label} />
      ))}
    </div>
  );
}
