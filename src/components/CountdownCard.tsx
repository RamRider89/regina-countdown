// TODO: glassmorphism styling, hover animation, responsive size
interface Props {
  value: number;
  label: string;
}

export function CountdownCard({ value, label }: Props) {
  return (
    <div className="countdown-card">
      <span className="countdown-card__value">{String(value).padStart(2, '0')}</span>
      <span className="countdown-card__label">{label}</span>
    </div>
  );
}
