import { useEffect } from 'react';
import { useConfig } from './hooks/useConfig';
import { Hero } from './components/Hero';
import { localize } from './i18n/localize';

export default function App() {
  const { config, error, loading } = useConfig();

  useEffect(() => {
    if (!config) return;

    const locale = config.language ?? 'es';
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.theme.primaryColor);
    root.style.setProperty('--secondary-color', config.theme.secondaryColor);
    root.style.setProperty('--accent-color', config.theme.accentColor);

    document.title = `✈️ ${localize(config.tripName, locale)}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', localize(config.subtitle, locale));
  }, [config]);

  if (loading) {
    return (
      <div className="loading-screen" aria-label="Cargando">
        <div className="spinner" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="error-screen" role="alert">
        Error al cargar configuración: {error}
      </p>
    );
  }

  if (!config) return null;

  return <Hero config={config} />;
}
