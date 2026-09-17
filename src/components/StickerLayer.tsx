interface Props {
  stickers: string[];
}

const POSITIONS = [
  'sticker--top-right',
  'sticker--bottom-left',
  'sticker--top-left',
  'sticker--bottom-right',
  'sticker--mid-right',
] as const;

export function StickerLayer({ stickers }: Props) {
  if (!stickers.length) return null;
  return (
    <>
      {stickers.slice(0, POSITIONS.length).map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`sticker ${POSITIONS[i]}`}
          loading="lazy"
          decoding="async"
        />
      ))}
    </>
  );
}
