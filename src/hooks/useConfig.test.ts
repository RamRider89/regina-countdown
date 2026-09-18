import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { useConfig } from './useConfig';

const VALID_CONFIG = {
  tripName: 'Vacaciones en Japón',
  subtitle: 'Preparándonos para una nueva aventura',
  departureDate: '2027-04-10T08:00:00Z',
  timezone: 'America/Mexico_City',
  destination: 'Tokio, Japón',
  participants: ['Carlos', 'Andrea'],
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#F97316',
    accentColor: '#22C55E',
  },
  completionMessage: '¡Es hora de viajar!',
};

function mockFetch(body: unknown, ok = true, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  }));
}

describe('useConfig', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('starts in loading state', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
    const { result } = renderHook(() => useConfig());
    expect(result.current.loading).toBe(true);
    expect(result.current.config).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns valid config on success', async () => {
    mockFetch(VALID_CONFIG);
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.config).toEqual(VALID_CONFIG);
    expect(result.current.error).toBeNull();
  });

  it('sets error on HTTP failure', async () => {
    mockFetch(null, false, 404);
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.config).toBeNull();
    expect(result.current.error).toMatch(/HTTP 404/);
  });

  it('sets error when a required string field is missing', async () => {
    const { tripName: _omit, ...noTripName } = VALID_CONFIG;
    mockFetch(noTripName);
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/tripName/);
  });

  it('sets error for an invalid departureDate', async () => {
    mockFetch({ ...VALID_CONFIG, departureDate: 'not-a-date' });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/departureDate/);
  });

  it('sets error when participants is not an array', async () => {
    mockFetch({ ...VALID_CONFIG, participants: 'Carlos' });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/participants/);
  });

  it('sets error for an invalid theme color', async () => {
    mockFetch({ ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, primaryColor: 'blue' } });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/theme\.primaryColor/);
  });

  it('sets error when theme is missing', async () => {
    const { theme: _omit, ...noTheme } = VALID_CONFIG;
    mockFetch(noTheme);
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/theme/);
  });

  it('sets error when config is not an object', async () => {
    mockFetch('just a string');
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/objeto JSON/);
  });
});
