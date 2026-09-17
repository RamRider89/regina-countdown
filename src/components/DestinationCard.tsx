interface Props {
  destination: string;
}

export function DestinationCard({ destination }: Props) {
  return (
    <div className="destination-card">
      <span className="destination-card__icon" aria-hidden="true">📍</span>
      <span className="destination-card__name">{destination}</span>
    </div>
  );
}
