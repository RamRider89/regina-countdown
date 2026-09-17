import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  message: string;
}

export function CelebrationOverlay({ message }: Props) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const style = getComputedStyle(document.documentElement);
    const colors = [
      style.getPropertyValue('--primary-color').trim() || '#3B82F6',
      style.getPropertyValue('--secondary-color').trim() || '#F97316',
      style.getPropertyValue('--accent-color').trim() || '#22C55E',
    ];

    confetti({ particleCount: 180, spread: 100, origin: { y: 0.55 }, colors });

    const id = setTimeout(
      () => confetti({ particleCount: 120, spread: 140, origin: { y: 0.45 }, colors }),
      1800,
    );

    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="celebration-overlay"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="celebration-overlay__message">{message}</p>
    </div>
  );
}
