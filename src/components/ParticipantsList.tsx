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

export function ParticipantsList({ participants }: Props) {
  if (!participants.length) return null;
  return (
    <div className="participants">
      <span className="participants__label">Viajeros</span>
      <ul className="participants__list" role="list">
        {participants.map((name) => (
          <li key={name} className="participant-bubble">
            <span className="participant-bubble__initials" aria-hidden="true">
              {initials(name)}
            </span>
            <span className="participant-bubble__name">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
