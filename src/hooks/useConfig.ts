import { useEffect, useState } from 'react';
import { CountdownConfig } from '../types/config';

interface UseConfigResult {
  config: CountdownConfig | null;
  error: string | null;
  loading: boolean;
}

const REQUIRED_FIELDS: (keyof CountdownConfig)[] = [
  'targetDate', 'title', 'subtitle', 'primaryColor', 'secondaryColor',
  'ctaText', 'completionMessage',
];

function validateConfig(raw: unknown): CountdownConfig {
  if (!raw || typeof raw !== 'object') {
    throw new Error('config.json debe ser un objeto JSON válido');
  }
  const cfg = raw as Record<string, unknown>;

  for (const field of REQUIRED_FIELDS) {
    if (typeof cfg[field] !== 'string' || !(cfg[field] as string).trim()) {
      throw new Error(`config.json: campo requerido faltante o vacío — "${field}"`);
    }
  }

  if (isNaN(new Date(cfg.targetDate as string).getTime())) {
    throw new Error(`config.json: "targetDate" no es una fecha ISO válida — "${cfg.targetDate}"`);
  }

  const hexRe = /^#[0-9a-fA-F]{3,8}$/;
  for (const f of ['primaryColor', 'secondaryColor'] as const) {
    if (!hexRe.test(cfg[f] as string)) {
      throw new Error(`config.json: "${f}" debe ser un color hex CSS válido — "${cfg[f]}"`);
    }
  }

  return cfg as unknown as CountdownConfig;
}

export function useConfig(): UseConfigResult {
  const [config, setConfig] = useState<CountdownConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/config.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((raw) => setConfig(validateConfig(raw)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { config, error, loading };
}
