import { VacationConfig } from '../types/config';
import { CountdownGrid } from './CountdownGrid';
import { DestinationCard } from './DestinationCard';
import { ParticipantsList } from './ParticipantsList';
import { PhotoGallery } from './PhotoGallery';
import { StickerLayer } from './StickerLayer';

interface Props {
  config: VacationConfig;
}

export function Hero({ config }: Props) {
  return (
    <main
      className="hero"
      style={
        config.backgroundImage
          ? { backgroundImage: `url(${config.backgroundImage})` }
          : undefined
      }
    >
      {config.stickers && <StickerLayer stickers={config.stickers} />}
      {config.backgroundVideo && (
        <video
          className="hero__video-bg"
          src={config.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div className="hero__content">
        <p className="hero__eyebrow">✈️ La aventura comienza en...</p>
        <h1 className="hero__title">{config.tripName}</h1>
        <p className="hero__subtitle">{config.subtitle}</p>

        <CountdownGrid config={config} />

        <div className="hero__info-row">
          <DestinationCard destination={config.destination} />
          <ParticipantsList participants={config.participants} />
        </div>

        {config.gallery && config.gallery.length > 0 && (
          <PhotoGallery images={config.gallery} />
        )}
      </div>
    </main>
  );
}
