interface Props {
  value: number;
  label: string;
}

export function CountdownCard({ value, label }: Props) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="countdown-card">
      {/* key on value re-triggers pop-in animation each tick */}
      <span key={display} className="countdown-card__value">{display}</span>
      <span className="countdown-card__label">{label}</span>
    </div>
  );
}
