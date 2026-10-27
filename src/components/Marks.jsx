export function Barbell({ className }) {
  return (
    <svg className={className} viewBox="0 0 400 150" width="400" height="150" aria-hidden="true">
      <rect x="8" y="22" width="28" height="106" rx="5" fill="#161311" />
      <rect x="38" y="32" width="22" height="86" rx="4" fill="#ff5a1f" />
      <rect x="62" y="42" width="16" height="66" rx="4" fill="#ffc43a" />
      <rect x="78" y="56" width="16" height="38" rx="3" fill="#6e1b2a" />
      <rect x="90" y="66" width="220" height="18" rx="9" fill="#efe8dc" />
      <g stroke="#161311" strokeWidth="1.4" opacity="0.35">
        {Array.from({ length: 16 }, (_, index) => (
          <line key={index} x1={150 + index * 6} y1="69" x2={150 + index * 6} y2="81" />
        ))}
      </g>
      <rect x="306" y="56" width="16" height="38" rx="3" fill="#6e1b2a" />
      <rect x="322" y="42" width="16" height="66" rx="4" fill="#ffc43a" />
      <rect x="340" y="32" width="22" height="86" rx="4" fill="#ff5a1f" />
      <rect x="364" y="22" width="28" height="106" rx="5" fill="#161311" />
    </svg>
  );
}

export function Dumbbell({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 90" width="220" height="90" aria-hidden="true">
      <rect x="6" y="16" width="30" height="58" rx="7" fill="#161311" />
      <rect x="34" y="26" width="16" height="38" rx="4" fill="#ff5a1f" />
      <rect x="50" y="37" width="120" height="16" rx="8" fill="#efe8dc" />
      <rect x="78" y="41" width="64" height="8" rx="4" fill="#c8bfb2" />
      <rect x="170" y="26" width="16" height="38" rx="4" fill="#ff5a1f" />
      <rect x="184" y="16" width="30" height="58" rx="7" fill="#161311" />
    </svg>
  );
}

export function Kettlebell({ className }) {
  return (
    <svg className={className} viewBox="0 0 140 180" width="140" height="180" aria-hidden="true">
      <path d="M48 70c0-30 44-30 44 0" fill="none" stroke="#161311" strokeWidth="14" strokeLinecap="round" />
      <path d="M24 84c2-16 16-28 46-28s44 12 46 28c6 8 12 22 12 38 0 34-24 52-58 52S12 156 12 122c0-16 6-30 12-38z" fill="#161311" />
      <ellipse cx="70" cy="118" rx="30" ry="20" fill="#ff5a1f" />
      <text x="70" y="124" textAnchor="middle" fontFamily="Syne, sans-serif" fontSize="16" fontWeight="800" fill="#161311">16</text>
    </svg>
  );
}

export function Plate({ className, weight = "20" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill="#161311" />
      <circle cx="60" cy="60" r="49" fill="#ff5a1f" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="#161311" strokeWidth="3" />
      <circle cx="60" cy="60" r="16" fill="#f6f1e7" />
      <circle cx="60" cy="60" r="8" fill="#161311" />
      <text x="60" y="36" textAnchor="middle" fontFamily="Syne, sans-serif" fontSize="15" fontWeight="800" fill="#161311">{weight}</text>
    </svg>
  );
}

export function Rope({ className }) {
  return (
    <svg className={className} viewBox="0 0 180 70" width="180" height="70" aria-hidden="true">
      <path d="M24 36c18-24 36-24 54 0s36 24 54 0 28-22 44-8" fill="none" stroke="#128a84" strokeWidth="6" strokeLinecap="round" />
      <rect x="4" y="24" width="18" height="24" rx="5" fill="#161311" />
      <rect x="156" y="16" width="18" height="24" rx="5" fill="#161311" />
    </svg>
  );
}

export function MedBall({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#e23b2b" />
      <path d="M60 6c20 20 20 88 0 108M60 6C40 26 40 94 60 114M8 60h104" fill="none" stroke="#161311" strokeWidth="4" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#161311" strokeWidth="4" />
    </svg>
  );
}
