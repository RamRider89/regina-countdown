import { VacationConfig } from '../types/config';
import { CountdownGrid } from './CountdownGrid';
import { DestinationCard } from './DestinationCard';
import { TravelersGallery } from './TravelersGallery';
import { StickerLayer } from './StickerLayer';

interface Props {
  config: VacationConfig;
}

export function Hero({ config }: Props) {
  const videoSrc = config.backgroundVideoMobile &&
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
      ? config.backgroundVideoMobile
      : config.backgroundVideo;

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
      {videoSrc && (
        <video
          className="hero__video-bg"
          src={videoSrc}
          poster={config.backgroundImage}
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
        </div>

        <TravelersGallery participants={config.participants} />
      </div>
    </main>
  );
}
