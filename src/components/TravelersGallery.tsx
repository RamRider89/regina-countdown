import { UserCircle } from 'lucide-react';
import { Participant } from '../types/config';

interface Props {
  participants: Participant[];
}

export function TravelersGallery({ participants }: Props) {
  if (!participants.length) return null;
  return (
    <div className="travelers-gallery" aria-label="Viajeros">
      {participants.map(({ name, avatar }) => (
        <div key={name} className="traveler-card">
          <div className={`traveler-card__avatar${avatar ? ' traveler-card__avatar--image' : ''}`} aria-hidden="true">
            {avatar
              ? <img src={avatar} alt="" className="traveler-card__avatar-img" />
              : <UserCircle className="traveler-card__icon" strokeWidth={1.25} />
            }
          </div>
          <span className="traveler-card__name">{name}</span>
          <span className="traveler-card__badge" aria-hidden="true">✈️</span>
        </div>
      ))}
    </div>
  );
}
