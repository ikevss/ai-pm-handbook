export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" className="fill-muted" />
      <rect x="12" y="9" width="40" height="46" rx="5" className="fill-primary" />
      <rect x="18" y="18" width="28" height="3" rx="1.5" fill="#faf8f5" opacity="0.95" />
      <rect x="18" y="26" width="22" height="3" rx="1.5" fill="#faf8f5" opacity="0.75" />
      <rect x="18" y="34" width="26" height="3" rx="1.5" fill="#faf8f5" opacity="0.55" />
      <rect x="38" y="38" width="18" height="18" rx="5" className="fill-foreground" />
      <text
        x="47"
        y="51"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="bold"
        fill="#faf8f5"
        textAnchor="middle"
      >
        AI
      </text>
    </svg>
  );
}