interface Props {
  images: string[];
}

export function PhotoGallery({ images }: Props) {
  if (!images.length) return null;
  return (
    <div className="photo-gallery" aria-label="Galería de fotos del viaje">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Foto del viaje ${i + 1}`}
          className="photo-gallery__img"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
