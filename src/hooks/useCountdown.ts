import { useEffect, useState } from 'react';
import { TimeRemaining } from '../types/config';

function compute(targetDate: string): TimeRemaining {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isExpired: false,
  };
}

export function useCountdown(targetDate: string): TimeRemaining {
  const [time, setTime] = useState<TimeRemaining>(() => compute(targetDate));

  useEffect(() => {
    if (time.isExpired) return;
    const id = setInterval(() => {
      const next = compute(targetDate);
      setTime(next);
      if (next.isExpired) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate, time.isExpired]);

  return time;
}
