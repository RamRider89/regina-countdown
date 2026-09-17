import { useEffect } from 'react';
import { useConfig } from './hooks/useConfig';
import { Hero } from './components/Hero';

export default function App() {
  const { config, error, loading } = useConfig();

  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.primaryColor);
    root.style.setProperty('--secondary-color', config.secondaryColor);
    document.title = config.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', config.subtitle);
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
