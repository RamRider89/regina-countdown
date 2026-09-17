// TODO: hover/focus states, accessibility (aria-label when needed)
interface Props {
  href: string;
  primaryColor: string;
  children: React.ReactNode;
}

export function CtaButton({ href, primaryColor, children }: Props) {
  return (
    <a
      href={href}
      className="cta-button"
      style={{ backgroundColor: primaryColor }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
