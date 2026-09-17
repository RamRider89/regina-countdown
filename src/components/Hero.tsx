import { CountdownConfig } from '../types/config';
import { CountdownGrid } from './CountdownGrid';
import { CtaButton } from './CtaButton';

interface Props {
  config: CountdownConfig;
}

export function Hero({ config }: Props) {
  return (
    <main
      className="hero"
      style={config.backgroundImage ? { backgroundImage: `url(${config.backgroundImage})` } : undefined}
    >
      {config.logo && (
        <img src={config.logo} alt="Logo" className="hero__logo" />
      )}
      <h1 className="hero__title">{config.title}</h1>
      <p className="hero__subtitle">{config.subtitle}</p>
      <CountdownGrid config={config} />
      {config.ctaUrl && (
        <CtaButton href={config.ctaUrl} primaryColor={config.primaryColor}>
          {config.ctaText}
        </CtaButton>
      )}
    </main>
  );
}
