export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="110 200 1100 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      <g transform="translate(128 215)">
        <text
          x="0"
          y="126"
          fill="#171717"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="156"
          fontWeight="900"
          letterSpacing="0"
        >
          EASY
        </text>
        <g transform="translate(520 16)" fill="#C21318">
          <rect x="0" y="46" width="92" height="18" rx="9" />
          <rect x="0" y="86" width="72" height="18" rx="9" />
          <rect x="0" y="126" width="54" height="18" rx="9" />
        </g>
        <g transform="translate(640 0)">
          <path
            d="M0 18C0 8.059 8.059 0 18 0H96C158.96 0 210 51.04 210 114C210 176.96 158.96 228 96 228H18C8.059 228 0 219.941 0 210V18Z"
            fill="#C21318"
          />
          <path
            d="M60 112L91 143L154 76"
            stroke="#ffffff"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="870"
          y="180"
          fill="#C21318"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="156"
          fontWeight="900"
          letterSpacing="0"
        >
          ICK
        </text>
      </g>
    </svg>
  );
}
