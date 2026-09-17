import { useEffect } from 'react';
import { useConfig } from './hooks/useConfig';
import { Hero } from './components/Hero';

export default function App() {
  const { config, error, loading } = useConfig();

  useEffect(() => {
    if (!config) return;

    // CSS custom properties from config
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.primaryColor);
    root.style.setProperty('--secondary-color', config.secondaryColor);

    // SEO meta
    document.title = config.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', config.subtitle);

    // Favicon from logo
    if (config.logo) {
      const link =
        document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
        (() => {
          const el = document.createElement('link');
          el.rel = 'icon';
          document.head.appendChild(el);
          return el;
        })();
      link.href = config.logo;
    }
  }, [config]);

  if (loading) {
    return (
      <div className="loading-screen" aria-label="Cargando">
        <div className="spinner" role="status" />
      </div>
    );
  }

  if (error) {
    return <p className="error-screen">Error al cargar configuración: {error}</p>;
  }

  if (!config) return null;

  return <Hero config={config} />;
}
