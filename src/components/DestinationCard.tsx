interface Props {
  destination: string;
  destinationImage?: string;
}

export function DestinationCard({ destination, destinationImage }: Props) {
  return (
    <div className="destination-card">
      {destinationImage
        ? <img src={destinationImage} alt={destination} className="destination-card__img" />
        : <><span className="destination-card__icon" aria-hidden="true">📍</span>
           <span className="destination-card__name">{destination}</span></>
      }
    </div>
  );
}
