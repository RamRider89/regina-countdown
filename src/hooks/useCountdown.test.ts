import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCountdown } from './useCountdown';

// 2025-01-01 00:00:00 UTC as fixed "now"
const NOW = new Date('2025-01-01T00:00:00Z').getTime();

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('computes correct initial time for a future date', () => {
    // target: 1d 2h 3m 4s ahead
    const target = new Date(NOW + 1 * 86_400_000 + 2 * 3_600_000 + 3 * 60_000 + 4_000).toISOString();
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.days).toBe(1);
    expect(result.current.hours).toBe(2);
    expect(result.current.minutes).toBe(3);
    expect(result.current.seconds).toBe(4);
    expect(result.current.isExpired).toBe(false);
  });

  it('returns isExpired immediately for a past date', () => {
    const past = new Date(NOW - 1000).toISOString();
    const { result } = renderHook(() => useCountdown(past));

    expect(result.current.isExpired).toBe(true);
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('decrements seconds on each 1-second tick', () => {
    const target = new Date(NOW + 10_000).toISOString(); // 10 s away

    const { result } = renderHook(() => useCountdown(target));
    expect(result.current.seconds).toBe(10);

    act(() => { vi.advanceTimersByTime(1000); });
    expect(result.current.seconds).toBe(9);

    act(() => { vi.advanceTimersByTime(1000); });
    expect(result.current.seconds).toBe(8);
  });

  it('sets isExpired when countdown reaches zero', () => {
    const target = new Date(NOW + 2_000).toISOString(); // 2 s away

    const { result } = renderHook(() => useCountdown(target));
    expect(result.current.isExpired).toBe(false);

    act(() => { vi.advanceTimersByTime(2000); });
    expect(result.current.isExpired).toBe(true);
  });

  it('does not tick after expiry', () => {
    const target = new Date(NOW + 1_000).toISOString();
    const { result } = renderHook(() => useCountdown(target));

    act(() => { vi.advanceTimersByTime(5000); }); // advance well past expiry

    expect(result.current.isExpired).toBe(true);
    expect(result.current.seconds).toBe(0);
  });
});
