import { useEffect, useRef, useState } from 'react';

interface ActiveSticker {
  id: number;
  src: string;
  x: number;        // % from left
  y: number;        // % from top
  size: number;     // px
  rotation: number; // deg
  duration: number; // ms — full appear→hold→disappear cycle
}

interface Props {
  pool: string[];
  maxVisible?: number;
}

let uid = 0;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function FloatingStickers({ pool, maxVisible = 4 }: Props) {
  const [stickers, setStickers] = useState<ActiveSticker[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!pool.length) return;
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;

    const spawn = () => {
      if (!active) return;
      setStickers((prev) => {
        if (prev.length >= maxVisible) return prev;
        return [...prev, {
          id: uid++,
          src: pool[Math.floor(Math.random() * pool.length)],
          x: rand(2, 90),
          y: rand(2, 85),
          size: rand(48, 120),
          rotation: rand(-40, 40),
          duration: rand(2200, 5000),
        }];
      });
      timerRef.current = setTimeout(spawn, rand(600, 1800));
    };

    timerRef.current = setTimeout(spawn, rand(100, 500));

    return () => {
      active = false;
      clearTimeout(timerRef.current);
    };
  }, [pool, maxVisible]);

  const remove = (id: number) =>
    setStickers((prev) => prev.filter((s) => s.id !== id));

  return (
    <>
      {stickers.map((s) => (
        <img
          key={s.id}
          src={s.src}
          alt=""
          aria-hidden="true"
          className="floating-sticker"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            '--dur': `${s.duration}ms`,
            '--rot': `${s.rotation}deg`,
          } as React.CSSProperties}
          onAnimationEnd={() => remove(s.id)}
        />
      ))}
    </>
  );
}
