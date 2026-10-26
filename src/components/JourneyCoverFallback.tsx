import { useId } from 'react';

interface JourneyCoverFallbackProps {
  accent: string;
  icon: string;
}

export function JourneyCoverFallback({ accent, icon }: JourneyCoverFallbackProps) {
  const patternId = useId();

  return (
    <div
      className="journey-cover-fallback"
      style={{
        background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 50%, black))`,
      }}
    >
      <svg className="journey-cover-pattern" aria-hidden="true">
        <defs>
          <pattern
            id={patternId}
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <line
              x1="0"
              y1="18"
              x2="36"
              y2="18"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div className="journey-cover-badge">{icon}</div>
    </div>
  );
}
