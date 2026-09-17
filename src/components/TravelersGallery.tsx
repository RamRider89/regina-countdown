import { UserCircle } from 'lucide-react';

interface Props {
  participants: string[];
}

export function TravelersGallery({ participants }: Props) {
  if (!participants.length) return null;
  return (
    <div className="travelers-gallery" aria-label="Viajeros">
      {participants.map((name) => (
        <div key={name} className="traveler-card">
          <div className="traveler-card__avatar" aria-hidden="true">
            <UserCircle className="traveler-card__icon" strokeWidth={1.25} />
          </div>
          <span className="traveler-card__name">{name}</span>
          <span className="traveler-card__badge" aria-hidden="true">✈️</span>
        </div>
      ))}
    </div>
  );
}
