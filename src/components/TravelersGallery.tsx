interface Props {
  participants: string[];
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TravelersGallery({ participants }: Props) {
  if (!participants.length) return null;
  return (
    <div className="travelers-gallery" aria-label="Viajeros">
      {participants.map((name) => (
        <div key={name} className="traveler-card">
          <div className="traveler-card__avatar" aria-hidden="true">
            {initials(name)}
          </div>
          <span className="traveler-card__name">{name}</span>
          <span className="traveler-card__badge" aria-hidden="true">✈️</span>
        </div>
      ))}
    </div>
  );
}
