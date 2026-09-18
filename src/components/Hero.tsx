import { useEffect, useRef, useState } from 'react';
import { VacationConfig, Locale } from '../types/config';
import { CountdownGrid } from './CountdownGrid';
import { DestinationCard } from './DestinationCard';
import { TravelersGallery } from './TravelersGallery';
import { FloatingStickers } from './FloatingStickers';
import { DepartureTimezones } from './DepartureTimezones';
import { translations } from '../i18n/translations';
import { localize } from '../i18n/localize';

interface Props {
  config: VacationConfig;
}

const IMAGE_EXTS = /\.(webp|gif|png|jpg|jpeg|avif)$/i;

export function Hero({ config }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const isMobile = typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  const bgSrc = (isMobile && config.backgroundVideoMobile) || config.backgroundVideo;
  const isImageBg = bgSrc ? IMAGE_EXTS.test(bgSrc) : false;

  useEffect(() => {
    setVideoFailed(false);
    const video = videoRef.current;
    if (!video) return;
    // Fix React muted prop bug: JSX muted no escribe el atributo DOM que Safari verifica
    video.muted = true;
    video.play().catch(() => setVideoFailed(true));
  }, [bgSrc]);

  const locale: Locale = config.language ?? 'es';
  const t = translations[locale];

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
      {bgSrc && (isImageBg || videoFailed
        ? <img
            className="hero__video-bg"
            src={videoFailed && config.backgroundImage ? config.backgroundImage : bgSrc}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        : <video
            ref={videoRef}
            className="hero__video-bg"
            poster={config.backgroundImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={bgSrc} type="video/mp4" />
          </video>
      )}
      <div className="hero__content">
        <p className="hero__eyebrow">{t.eyebrow}</p>
        <h1 className="hero__title">{localize(config.tripName, locale)}</h1>
        <p className="hero__subtitle">{localize(config.subtitle, locale)}</p>

        <CountdownGrid config={config} />

        <div className="hero__info-row">
          <DestinationCard destination={config.destination} destinationImage={config.destinationImage} />
          {config.timezones && config.timezones.length > 0 && (
            <DepartureTimezones
              departureDate={config.departureDate}
              timezones={config.timezones}
              label={t.departure}
            />
          )}
        </div>

        <TravelersGallery participants={config.participants} />
      </div>
    </main>
  );
}
