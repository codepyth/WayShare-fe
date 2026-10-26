import type { IconProps } from "./types";

export function AlertTriangleIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M12 4.2l8.4 15H3.6l8.4-15z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.8" r="1.05" fill="currentColor" />
    </svg>
  );
}
