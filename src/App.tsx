import { useConfig } from './hooks/useConfig';
import { Hero } from './components/Hero';

export default function App() {
  const { config, error, loading } = useConfig();

  if (loading) return null;
  if (error)   return <p className="error">Error al cargar configuración: {error}</p>;
  if (!config) return null;

  return <Hero config={config} />;
}
