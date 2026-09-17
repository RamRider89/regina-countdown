import { useEffect, useState } from 'react';
import { CountdownConfig } from '../types/config';

interface UseConfigResult {
  config: CountdownConfig | null;
  error: string | null;
  loading: boolean;
}

export function useConfig(): UseConfigResult {
  const [config, setConfig] = useState<CountdownConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/config.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<CountdownConfig>;
      })
      .then(setConfig)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { config, error, loading };
}
