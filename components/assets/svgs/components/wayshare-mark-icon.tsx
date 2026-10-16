import type { IconProps } from "./types";

/** The WayShare route mark: an amber origin joined to a destination ring. */
export function WayShareMarkIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      {...props}
    >
      <circle cx="7" cy="7" r="3.1" fill="#F0B429" />
      <circle cx="17" cy="17" r="2.7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M7 11.2c0 5.4 2.4 6.9 7 6.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="0.5 4"
      />
    </svg>
  );
}
