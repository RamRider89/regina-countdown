import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useConfig } from './useConfig';

const VALID_CONFIG = {
  targetDate: '2027-01-01T00:00:00Z',
  timezone: 'America/Mexico_City',
  title: 'Lanzamiento',
  subtitle: 'Falta poco',
  primaryColor: '#0057B8',
  secondaryColor: '#00A3E0',
  ctaText: 'Conoce Más',
  ctaUrl: 'https://example.com',
  completionMessage: '¡Ya comenzamos!',
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
    // Never-resolving fetch so the state update never fires after the test
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

  it('sets error when a required field is missing', async () => {
    const { title: _omit, ...noTitle } = VALID_CONFIG;
    mockFetch(noTitle);
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/title/);
  });

  it('sets error for an invalid targetDate', async () => {
    mockFetch({ ...VALID_CONFIG, targetDate: 'not-a-date' });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/targetDate/);
  });

  it('sets error for an invalid primaryColor', async () => {
    mockFetch({ ...VALID_CONFIG, primaryColor: 'blue' });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/primaryColor/);
  });

  it('sets error for an invalid secondaryColor', async () => {
    mockFetch({ ...VALID_CONFIG, secondaryColor: 'rgb(0,0,0)' });
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/secondaryColor/);
  });

  it('sets error when config is not an object', async () => {
    mockFetch('just a string');
    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/objeto JSON/);
  });
});
