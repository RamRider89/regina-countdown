import { TimezoneEntry } from '../types/config';

interface Props {
  departureDate: string;
  timezones: TimezoneEntry[];
  label: string;
}

function formatTime(isoDate: string, tz: string): string {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: tz,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}

export function DepartureTimezones({ departureDate, timezones, label }: Props) {
  return (
    <div className="departure-timezones">
      <span className="departure-timezones__label">🕐 {label}</span>
      <div className="departure-timezones__list">
        {timezones.map(({ label: tzLabel, tz }, i) => (
          <div key={tz} className={`departure-timezones__entry${i === 0 ? ' departure-timezones__entry--primary' : ''}`}>
            <span className="departure-timezones__city">{tzLabel}</span>
            <span className="departure-timezones__time">{formatTime(departureDate, tz)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
