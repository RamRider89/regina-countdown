import { useEffect, useState } from 'react';
import { VacationConfig } from '../types/config';

interface UseConfigResult {
  config: VacationConfig | null;
  error: string | null;
  loading: boolean;
}

const REQUIRED_STRING_FIELDS: (keyof VacationConfig)[] = [
  'tripName', 'subtitle', 'departureDate', 'destination', 'completionMessage',
];

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;

function validateConfig(raw: unknown): VacationConfig {
  if (!raw || typeof raw !== 'object') {
    throw new Error('config.json debe ser un objeto JSON válido');
  }
  const cfg = raw as Record<string, unknown>;

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof cfg[field] !== 'string' || !(cfg[field] as string).trim()) {
      throw new Error(`config.json: campo requerido faltante o vacío — "${field}"`);
    }
  }

  if (isNaN(new Date(cfg.departureDate as string).getTime())) {
    throw new Error(`config.json: "departureDate" no es una fecha ISO válida — "${cfg.departureDate}"`);
  }

  if (!Array.isArray(cfg.participants)) {
    throw new Error('config.json: "participants" debe ser un array');
  }

  const theme = cfg.theme as Record<string, unknown> | undefined;
  if (!theme || typeof theme !== 'object') {
    throw new Error('config.json: "theme" es requerido (objeto con primaryColor, secondaryColor, accentColor)');
  }
  for (const f of ['primaryColor', 'secondaryColor', 'accentColor'] as const) {
    if (typeof theme[f] !== 'string' || !HEX_RE.test(theme[f] as string)) {
      throw new Error(`config.json: "theme.${f}" debe ser un color hex CSS válido — "${theme[f]}"`);
    }
  }

  return cfg as unknown as VacationConfig;
}

export function useConfig(): UseConfigResult {
  const [config, setConfig] = useState<VacationConfig | null>(null);
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
