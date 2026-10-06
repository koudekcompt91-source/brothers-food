"use client";

import { useId, type ReactElement } from "react";

interface VisualProps {
  className?: string;
  label?: string;
}

function svgProps(label: string | undefined, className?: string) {
  return {
    className,
    role: label ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    viewBox: "0 0 400 480",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;
}

function BurgerArt({
  className,
  label,
  variant = "signature",
}: VisualProps & { variant?: "signature" | "cheese" | "smash" }) {
  const uid = useId().replace(/:/g, "");
  const smash = variant === "smash";
  const cheese = variant !== "smash";

  return (
    <svg {...svgProps(label, className)}>
      <defs>
        <linearGradient id={`${uid}-bun`} x1="200" y1="70" x2="200" y2="450" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe1a3" />
          <stop offset="0.45" stopColor="#f0a020" />
          <stop offset="1" stopColor="#c56a10" />
        </linearGradient>
        <linearGradient id={`${uid}-patty`} x1="80" y1="300" x2="320" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7a4630" />
          <stop offset="0.5" stopColor="#4a2818" />
          <stop offset="1" stopColor="#2a140c" />
        </linearGradient>
        <linearGradient id={`${uid}-cheese`} x1="100" y1="280" x2="320" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe38a" />
          <stop offset="1" stopColor="#f5a400" />
        </linearGradient>
        <filter id={`${uid}-sh`} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-sh)`}>
        <ellipse cx="200" cy="452" rx="132" ry="14" fill="#000" opacity="0.28" />

        <path
          d="M72 392c0-28 36-40 68-36h120c40-4 68 8 68 36 0 28-48 42-128 42S72 420 72 392Z"
          fill={`url(#${uid}-bun)`}
        />
        <path d="M96 388h208" stroke="#e7b15a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

        <path
          d="M108 372c22 16 40-6 62 8 22 14 36-10 58 4 24 16 40-8 64 6"
          stroke="#ff6a00"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M124 366c18 10 28-2 46 6"
          stroke="#ffd7a1"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />

        <ellipse cx="200" cy={smash ? 348 : 344} rx={smash ? 132 : 124} ry={smash ? 18 : 26} fill={`url(#${uid}-patty)`} />
        <ellipse cx="168" cy={smash ? 342 : 336} rx="18" ry="6" fill="#2a140c" opacity="0.55" />
        <ellipse cx="230" cy={smash ? 350 : 350} rx="22" ry="5" fill="#1a0d08" opacity="0.45" />

        {cheese && (
          <>
            <path d="M86 312h228l18 46-36-8-72 14-78-10-42 8-18-50Z" fill={`url(#${uid}-cheese)`} />
            <path d="M300 328c18 28 8 62-6 78-6-16-2-36 6-50 4 10 8 8 0-28Z" fill="#ffb703" />
            {variant === "cheese" && (
              <path d="M118 322c-8 34 6 58 18 70 4-20-2-40 2-54 6 8 4 6-20-16Z" fill="#ffc53d" />
            )}
          </>
        )}

        {!smash && (
          <ellipse cx="200" cy="300" rx="116" ry="22" fill={`url(#${uid}-patty)`} />
        )}

        <path
          d="M78 286c28-28 48 8 78-6 26-14 40 16 70 0 28-16 46 12 78 2 10 16-8 28-20 32-40 10-70-6-108 4-36-8-78 6-98-4-8-10-12-20 0-28Z"
          fill="#6fbf3a"
        />
        <path d="M110 292c16-8 24 4 36-2" stroke="#d8ff9a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

        <ellipse cx="150" cy="268" rx="36" ry="12" fill="#ef4b3a" />
        <ellipse cx="230" cy="274" rx="40" ry="13" fill="#d62828" />
        <ellipse cx="196" cy="262" rx="28" ry="9" fill="#ff6b57" />

        {smash && (
          <path
            d="M120 250c20 10 30-8 48 4 16 12 28-6 46 6 18 12 34-4 52 8"
            stroke="#f3d2a2"
            strokeWidth="7"
            strokeLinecap="round"
          />
        )}

        <path
          d="M84 250c0-92 52-132 116-136 64 4 116 44 116 136 0 22-28 36-116 40-88-4-116-18-116-40Z"
          fill={`url(#${uid}-bun)`}
        />
        <path
          d="M118 168c28-36 70-48 108-36"
          stroke="#fff6df"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.45"
        />
        {[
          [150, 150],
          [196, 128],
          [246, 146],
          [168, 188],
          [230, 196],
          [132, 210],
          [270, 188],
        ].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="8" ry="5" fill="#f7e7c3" transform={`rotate(-18 ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

export function BurgerVisual(props: VisualProps) {
  return <BurgerArt {...props} variant="signature" />;
}

export function CheeseBurgerVisual(props: VisualProps) {
  return <BurgerArt {...props} variant="cheese" />;
}

export function SmashBurgerVisual(props: VisualProps) {
  return <BurgerArt {...props} variant="smash" />;
}

export function FriesVisual({ className, label, loaded = false }: VisualProps & { loaded?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const fries = [
    [150, -8], [176, -18], [202, -6], [228, -20], [254, -4], [132, 4], [188, 8], [240, 6],
  ];
  return (
    <svg {...svgProps(label, className)}>
      <defs>
        <linearGradient id={`${uid}-fry`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ffe08a" />
          <stop offset="1" stopColor="#e09018" />
        </linearGradient>
        <linearGradient id={`${uid}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="430" rx="110" ry="16" fill="#000" opacity="0.25" />
      {fries.map(([x, tilt], i) => (
        <rect
          key={i}
          x={x}
          y={148 + (i % 3) * 8}
          width="18"
          height={150 - (i % 4) * 12}
          rx="8"
          fill={`url(#${uid}-fry)`}
          transform={`rotate(${tilt} ${x + 9} 230)`}
        />
      ))}
      <path d="M108 250h184l-22 150H130L108 250Z" fill={`url(#${uid}-box)`} />
      <path d="M118 274h164" stroke="#fff" strokeOpacity="0.35" strokeWidth="8" />
      <path d="M150 318h100" stroke="#111a35" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      {loaded && (
        <>
          <path d="M140 300c30 18 50-8 80 6 28 12 40-6 62 4" stroke="#ffc53d" strokeWidth="12" strokeLinecap="round" />
          <circle cx="176" cy="318" r="7" fill="#6b3a22" />
          <circle cx="214" cy="328" r="6" fill="#4a2818" />
          <circle cx="236" cy="310" r="5" fill="#7a4630" />
        </>
      )}
    </svg>
  );
}

export function ChickenVisual({ className, label }: VisualProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg {...svgProps(label, className)}>
      <defs>
        <linearGradient id={`${uid}-crust`} x1="80" y1="180" x2="320" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6c56b" />
          <stop offset="0.55" stopColor="#e3922a" />
          <stop offset="1" stopColor="#a85a12" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="440" rx="120" ry="14" fill="#000" opacity="0.25" />
      <path d="M78 360c0-22 40-34 122-34s122 12 122 34c0 26-46 40-122 40S78 386 78 360Z" fill="#f0a020" />
      <path d="M96 348c24 14 46-4 74 8 30 14 48-8 78 4" stroke="#fff4d2" strokeWidth="8" strokeLinecap="round" />
      <path
        d="M92 300c8-70 40-92 70-78 10 28 28 20 40 36 18-40 62-48 86-16 20 26 16 70-8 96-30 18-70 10-96 22-34 8-78-8-92-60Z"
        fill={`url(#${uid}-crust)`}
      />
      <path d="M140 230c20-8 36 10 18 22" stroke="#a85a12" strokeWidth="4" strokeLinecap="round" />
      <path d="M210 214c16 6 8 24-8 18" stroke="#fff1cc" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 250c30-36 62 6 96-10 28-14 40 18 72-2 22 20-6 34-18 40-46 8-80-10-112 6-16-8-28-22-38-34Z" fill="#7dcc45" />
      <path d="M86 168c0-70 50-104 114-108 66 4 116 42 116 108 0 20-30 32-114 36-86-4-116-16-116-36Z" fill="#f2b03a" />
      {[ [150, 120], [200, 104], [248, 128], [176, 156] ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="7" ry="4.5" fill="#f8e7c4" />
      ))}
    </svg>
  );
}

export function WingsVisual({ className, label }: VisualProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg {...svgProps(label, className)}>
      <defs>
        <linearGradient id={`${uid}-wing`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffb347" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="430" rx="140" ry="16" fill="#000" opacity="0.22" />
      {[
        "M70 300c40-90 120-70 150-10 10 20-20 70-70 90-60 16-110-20-80-80Z",
        "M150 250c50-80 140-40 150 30 6 40-30 80-90 84-70 4-110-40-60-114Z",
        "M40 240c30-70 110-60 140 0 12 24-10 64-60 78-58 12-110-16-80-78Z",
      ].map((d, i) => (
        <path key={d} d={d} fill={`url(#${uid}-wing)`} opacity={0.92 - i * 0.05} />
      ))}
      <path d="M120 280c30 10 40-16 62-4" stroke="#ff6a00" strokeWidth="8" strokeLinecap="round" />
      <path d="M210 250c28 16 36-10 58 4" stroke="#7a1f00" strokeWidth="6" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function TacosVisual({ className, label, chicken = false }: VisualProps & { chicken?: boolean }) {
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="440" rx="130" ry="14" fill="#000" opacity="0.22" />
      <g transform="translate(40 40) rotate(-8 160 180)">
        <path d="M70 150c0 90 50 150 110 150s110-60 110-150H70Z" fill="#e7b15a" />
        <path d="M86 160c0 74 40 124 94 124s94-50 94-124H86Z" fill="#f6d48a" />
        <path d="M100 168c18 20 30-6 52 10 20 16 34-8 56 8 16 12 28-4 40 6v70H100v-94Z" fill={chicken ? "#f0c27a" : "#8a4b2a"} />
        <path d="M108 176c16-16 30 8 48-4 22-14 28 12 50 0 10 18-4 20-8 28H116l-8-24Z" fill="#67b83a" />
        <circle cx="150" cy="230" r="8" fill="#ef4b3a" />
        <circle cx="196" cy="246" r="7" fill="#d62828" />
        <path d="M160 210c20 8 28-6 44 2" stroke="#fff4d2" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(70 10)">
        <path d="M80 180c0 86 46 140 100 140s100-54 100-140H80Z" fill="#f0c14b" />
        <path d="M96 190c0 70 38 116 84 116s84-46 84-116H96Z" fill="#ffe1a3" />
        <path d="M112 200h132v78c-20 8-40-6-66 4-28 8-44-10-66-4v-78Z" fill={chicken ? "#f4d19a" : "#6b3a22"} />
        <path d="M118 206c22-10 36 12 58 0 20-10 34 8 52 2v24H118v-26Z" fill="#8fd14f" />
      </g>
    </svg>
  );
}

export function PizzaVisual({ className, label }: VisualProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg {...svgProps(label, className)}>
      <defs>
        <radialGradient id={`${uid}-pie`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffe1a3" />
          <stop offset="70%" stopColor="#f0a020" />
          <stop offset="100%" stopColor="#c56a10" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="430" rx="140" ry="16" fill="#000" opacity="0.22" />
      <circle cx="200" cy="250" r="150" fill={`url(#${uid}-pie)`} />
      <circle cx="200" cy="250" r="128" fill="#d23b2a" />
      <circle cx="200" cy="250" r="112" fill="#f4f0e6" opacity="0.15" />
      {[
        [150, 190], [230, 180], [176, 250], [250, 240], [140, 280], [210, 300], [270, 290],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="16" fill="#fff6df" />
      ))}
      <path d="M200 250 L310 160" stroke="#c56a10" strokeWidth="3" />
      <path d="M310 150c20 10 8 50-6 70l-40 20 6-90h40Z" fill="#f2b03a" />
      <circle cx="292" cy="186" r="8" fill="#fff6df" />
      <path d="M250 168c8-16 20-8 14 6" stroke="#3d9a32" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function SodaVisual({ className, label }: VisualProps) {
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="440" rx="70" ry="12" fill="#000" opacity="0.25" />
      <path d="M132 150h136l-16 250H148L132 150Z" fill="#ff6a00" />
      <path d="M148 190h112l-8 180H156l-8-180Z" fill="#ff8a33" />
      <path d="M156 230c20 10 30-8 52 2 18 8 28-6 44 2v70H156v-74Z" fill="#fff" opacity="0.16" />
      <rect x="150" y="168" width="100" height="28" rx="4" fill="#111a35" />
      <ellipse cx="200" cy="148" rx="70" ry="16" fill="#1c2748" />
      <path d="M250 140c30-70 70-80 78-40" stroke="#f4f0e6" strokeWidth="8" strokeLinecap="round" />
      <text x="200" y="300" textAnchor="middle" fill="#111a35" fontFamily="Anton, Arial Black, sans-serif" fontSize="28">BF</text>
    </svg>
  );
}

export function ShakeVisual({ className, label }: VisualProps) {
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="440" rx="80" ry="12" fill="#000" opacity="0.25" />
      <path d="M128 210h144l-18 190H146L128 210Z" fill="#f7f1e8" />
      <path d="M146 250h112l-12 130H158L146 250Z" fill="#f3e2c4" />
      <path d="M150 168c8-40 28-52 50-52s42 12 50 52c-20 16-80 16-100 0Z" fill="#fff" />
      <circle cx="168" cy="150" r="16" fill="#fff" />
      <circle cx="206" cy="136" r="20" fill="#fff" />
      <circle cx="236" cy="156" r="14" fill="#fff" />
      <path d="M250 120c20-40 48-36 40 8" stroke="#e23b2f" strokeWidth="8" strokeLinecap="round" />
      <circle cx="292" cy="92" r="10" fill="#e23b2f" />
    </svg>
  );
}

export function SauceVisual({ className, label }: VisualProps) {
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="400" rx="90" ry="14" fill="#000" opacity="0.25" />
      <path d="M110 250h180l-16 120H126L110 250Z" fill="#f4f0e6" />
      <ellipse cx="200" cy="250" rx="90" ry="24" fill="#fff" />
      <ellipse cx="200" cy="250" rx="72" ry="16" fill="#ff6a00" />
      <path d="M168 246c16 8 24-6 40 2 12 6 20-4 32 2" stroke="#ffd7a1" strokeWidth="4" strokeLinecap="round" />
      <path d="M230 250c10 20 4 36-2 44" stroke="#ff6a00" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function ComboVisual({ className, label }: VisualProps) {
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="446" rx="150" ry="14" fill="#000" opacity="0.22" />
      <g transform="translate(8 70) scale(0.42)">
        <path d="M108 250h184l-22 150H130L108 250Z" fill="#ff6a00" />
        <rect x="176" y="140" width="16" height="130" rx="8" fill="#f0a020" transform="rotate(-6 184 200)" />
        <rect x="206" y="128" width="16" height="140" rx="8" fill="#ffe08a" />
        <rect x="236" y="146" width="16" height="120" rx="8" fill="#e09018" transform="rotate(7 244 200)" />
      </g>
      <g transform="translate(118 8) scale(0.62)">
        <path d="M84 250c0-92 52-132 116-136 64 4 116 44 116 136 0 22-28 36-116 40-88-4-116-18-116-40Z" fill="#f0a020" />
        <path d="M78 286c28-28 48 8 78-6 26-14 40 16 70 0 28-16 46 12 78 2 10 16-8 28-20 32-40 10-70-6-108 4-36-8-78 6-98-4-8-10-12-20 0-28Z" fill="#6fbf3a" />
        <ellipse cx="200" cy="330" rx="116" ry="24" fill="#4a2818" />
        <path d="M86 300h228l14 28H96l-10-28Z" fill="#ffc53d" />
        <path d="M72 392c0-28 36-40 68-36h120c40-4 68 8 68 36 0 28-48 42-128 42S72 420 72 392Z" fill="#e09018" />
      </g>
      <g transform="translate(250 168) scale(0.38)">
        <path d="M132 150h136l-16 250H148L132 150Z" fill="#ff6a00" />
        <ellipse cx="200" cy="148" rx="70" ry="16" fill="#1c2748" />
        <path d="M250 140c30-70 70-80 78-40" stroke="#f4f0e6" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function CrustyVisual({
  className,
  label,
  variant = "original",
}: VisualProps & { variant?: "original" | "cheese" | "spicy" | "brothers" }) {
  const sauce = variant === "spicy" ? "#e23b2f" : "#ff6a00";
  return (
    <svg {...svgProps(label, className)}>
      <ellipse cx="200" cy="430" rx="150" ry="16" fill="#000" opacity="0.28" />
      <path d="M70 250h260l-24 150H94L70 250Z" fill="#111a35" />
      <path d="M86 268h228l-16 118H102L86 268Z" fill="#1c2748" />
      <ellipse cx="200" cy="300" rx="96" ry="28" fill="#f3e2c0" />
      <ellipse cx="176" cy="294" rx="28" ry="10" fill="#fff6df" opacity="0.7" />
      <path d="M118 250c18-46 40-62 52-40 8 16 22 8 30 24 14-40 48-36 58-8 8 22-6 40-16 48-28 10-70 4-96 14-18-10-36-24-28-38Z" fill="#e3922a" />
      <path d="M210 236c16-36 42-28 48 4 4 20-10 36-22 42-16-8-30-22-26-46Z" fill="#f6c56b" />
      <path d="M150 248c10-28 34-22 36 6 2 16-12 28-20 32-12-6-20-18-16-38Z" fill="#c56a10" />
      {(variant === "cheese" || variant === "brothers") && (
        <path d="M130 286c24 16 40-8 70 4 28 12 46-6 72 6" stroke="#ffc53d" strokeWidth="12" strokeLinecap="round" />
      )}
      <path d="M146 318c22 12 36-6 62 4 24 8 40-4 58 6" stroke={sauce} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

const VISUALS: Record<string, (props: VisualProps) => ReactElement> = {
  "brothers-classic": (p) => <BurgerVisual {...p} />,
  "brothers-double": (p) => <CheeseBurgerVisual {...p} />,
  "brothers-crispy": (p) => <ChickenVisual {...p} />,
  "brothers-special": (p) => <SmashBurgerVisual {...p} />,
  "crispy-chicken": (p) => <ChickenVisual {...p} />,
  "chicken-tender": (p) => <WingsVisual {...p} />,
  "brothers-chicken": (p) => <ChickenVisual {...p} />,
  "the-brothers": (p) => <SmashBurgerVisual {...p} />,
  "tasty-crusty-original": (p) => <CrustyVisual {...p} variant="original" />,
  "tasty-crusty-cheese": (p) => <CrustyVisual {...p} variant="cheese" />,
  "tasty-crusty-spicy": (p) => <CrustyVisual {...p} variant="spicy" />,
  "tasty-crusty-brothers": (p) => <CrustyVisual {...p} variant="brothers" />,
};

export function FoodVisual({
  id,
  className,
  label,
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const Render = VISUALS[id] ?? BurgerVisual;
  return <Render className={className} label={label} />;
}

export function CheeseBit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden>
      <path d="M6 10h58l10 36-16-4-22 8L16 40 6 46 6 10Z" fill="#ffc53d" />
      <circle cx="24" cy="24" r="4" fill="#f5a400" />
      <circle cx="42" cy="28" r="3" fill="#f5a400" />
    </svg>
  );
}

export function OnionBit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden>
      <circle cx="36" cy="36" r="28" fill="none" stroke="#f3d2a2" strokeWidth="10" />
      <circle cx="36" cy="36" r="16" fill="none" stroke="#e7b15a" strokeWidth="4" />
    </svg>
  );
}

export function SauceBit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 80" className={className} aria-hidden>
      <path d="M30 6c0 16 8 20 8 36 0 10-8 18-8 28 12-6 24-6 28-20 4-18-6-28-4-44-8 8-16 8-24 0Z" fill="#ff6a00" />
    </svg>
  );
}
