import { VacationConfig } from '../types/config';
import { CountdownGrid } from './CountdownGrid';
import { DestinationCard } from './DestinationCard';
import { TravelersGallery } from './TravelersGallery';
import { FloatingStickers } from './FloatingStickers';

interface Props {
  config: VacationConfig;
}

export function Hero({ config }: Props) {
  const videoSrc = config.backgroundVideoMobile &&
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
      ? config.backgroundVideoMobile
      : config.backgroundVideo;

  const avatarUrls = new Set(
    config.participants.map((p) => p.avatar).filter(Boolean)
  );
  const stickerPool = (config.stickers ?? []).filter((url) => !avatarUrls.has(url));

  return (
    <main
      className="hero"
      style={
        config.backgroundImage
          ? { backgroundImage: `url(${config.backgroundImage})` }
          : undefined
      }
    >
      {stickerPool.length > 0 && <FloatingStickers pool={stickerPool} maxVisible={3} />}
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
          <DestinationCard destination={config.destination} destinationImage={config.destinationImage} />
        </div>

        <TravelersGallery participants={config.participants} />
      </div>
    </main>
  );
}
