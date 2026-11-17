/**
 * Small reusable pieces of scenery, all in the same outlined 2D style.
 * Each is an <svg> fragment (<g>) for use inside a parent <svg>, except
 * <CloudSvg>, which is a standalone element for HTML layouts.
 */
const NAVY = "#142B55";

export function Cloud({ transform }: { transform?: string }) {
  return (
    <path
      transform={transform}
      d="M14 44c-9 0-14-6-14-12s6-12 13-11c1-9 9-15 18-13 4-6 10-8 17-6 8 2 12 8 12 15 8-1 14 5 14 12 0 9-7 15-15 15z"
      fill="#fff"
      stroke={NAVY}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  );
}

export function CloudSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="-3 -3 82 52" className={className} aria-hidden="true">
      <Cloud />
    </svg>
  );
}

/** A rounded bush. Width ≈ 120, base at y = 0. */
export function Bush({
  transform,
  fill = "#8CCB7E",
}: {
  transform?: string;
  fill?: string;
}) {
  return (
    <g
      transform={transform}
      stroke={NAVY}
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      <path
        d="M0 0c-4-16 8-28 22-24 4-16 26-20 36-6 10-12 32-8 34 8 16-2 28 12 22 22z"
        fill={fill}
      />
      <path d="M30-12q4-4 8 0M70-14q4-4 8 0" fill="none" strokeWidth="1.6" />
    </g>
  );
}

/** Potted plant. About 60 wide, 90 tall, base at y = 0. */
export function Plant({ transform }: { transform?: string }) {
  return (
    <g
      transform={transform}
      stroke={NAVY}
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      <path d="M30-30C10-40 4-62 8-80c14 8 22 28 22 50z" fill="#7CC46B" />
      <path d="M30-30c18-14 26-34 22-56-14 10-22 30-22 56z" fill="#5FAF55" />
      <path d="M30-30C20-46 2-50-6-46c8 12 22 18 36 16z" fill="#93D27F" />
      <path d="M30-30c10-12 26-14 34-10-8 12-20 14-34 10z" fill="#93D27F" />
      <path d="M12-30h36l-5 30H17z" fill="#E98B5E" />
      <path d="M10-34h40v8H10z" fill="#F2A57C" />
    </g>
  );
}

/** A simple tree: trunk and three leaf clumps. About 120 wide, 170 tall. */
export function Tree({ transform }: { transform?: string }) {
  return (
    <g
      transform={transform}
      stroke={NAVY}
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      <path
        d="M54 0V-70c0-6-12-14-18-22M66 0v-80c4-8 14-14 20-20"
        fill="none"
        stroke="#7A5638"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M54 0V-70M66 0v-80" fill="none" />
      <circle cx="30" cy="-108" r="30" fill="#7CC46B" />
      <circle cx="92" cy="-112" r="30" fill="#6DBB5E" />
      <circle cx="60" cy="-140" r="34" fill="#8CCB7E" />
    </g>
  );
}

/**
 * Mumbai skyline band: towers in soft blues, a Gothic railway-terminus style
 * landmark in warm cream, and greenery along the bottom. viewBox 1440 × 300,
 * meant to be drawn with preserveAspectRatio="xMidYMax slice".
 */
export function MumbaiSkyline({ className }: { className?: string }) {
  const towers = [
    [40, 140, 70],
    [120, 100, 54],
    [180, 160, 80],
    [270, 120, 60],
    [880, 150, 64],
    [950, 110, 56],
    [1015, 190, 72],
    [1095, 130, 60],
    [1165, 170, 76],
    [1250, 120, 58],
    [1315, 150, 70],
    [1390, 110, 60],
  ];
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      {/* Far towers */}
      <g fill="#D6EEF8" stroke="#9CC8DF" strokeWidth="2">
        {towers.map(([x, h, w]) => (
          <rect key={x} x={x} y={300 - h} width={w} height={h} rx="4" />
        ))}
      </g>
      <g fill="#B7DCEE">
        {towers.map(([x, h, w]) =>
          Array.from({ length: Math.floor((h - 30) / 26) }, (_, r) => (
            <rect
              key={`${x}-${r}`}
              x={x + 10}
              y={300 - h + 16 + r * 26}
              width={w - 20}
              height="8"
              rx="2"
            />
          )),
        )}
      </g>

      {/* Landmark: Gothic terminus building */}
      <g stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M380 300V196h400v104z" fill="#F7E6C6" />
        <path d="M380 196l20-22h360l20 22z" fill="#E7B98B" />
        <path d="M520 300V160h120v140z" fill="#FBEED6" />
        <path d="M520 160l60-34 60 34z" fill="#E7B98B" />
        {/* Central dome */}
        <path d="M545 126c0-34 70-34 70 0z" fill="#E9A66F" />
        <path d="M575 96v-26M580 70h0" fill="none" />
        <circle cx="580" cy="62" r="6" fill="#F4C27E" />
        <path d="M580 50v-14" fill="none" />
        {/* Side turrets */}
        {[392, 748].map((x) => (
          <g key={x}>
            <path d={`M${x} 196v-46h28v46z`} fill="#FBEED6" />
            <path d={`M${x - 2} 150l16-30 16 30z`} fill="#D99A6A" />
          </g>
        ))}
        {/* Arched windows */}
        {[410, 450, 490, 670, 710, 750].map((x) => (
          <path
            key={x}
            d={`M${x} 290v-34c0-12 20-12 20 0v34z`}
            fill="#BFE3F3"
          />
        ))}
        {[540, 570, 600].map((x) => (
          <path
            key={x}
            d={`M${x} 230v-40c0-12 20-12 20 0v40z`}
            fill="#BFE3F3"
          />
        ))}
        <path d="M555 300v-44c0-30 50-30 50 0v44z" fill="#C88E62" />
      </g>

      {/* Palm trees */}
      {[300, 830].map((x) => (
        <g key={x} stroke={NAVY} strokeWidth="2" strokeLinejoin="round">
          <path
            d={`M${x} 300c4-40 2-80 8-112`}
            fill="none"
            stroke="#8B6340"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d={`M${x + 8} 188c-20-12-44-6-54 8 18-4 34-4 54-8zm0 0c18-16 44-14 56-2-18 0-36 0-56 2zm0 0c-6-20-24-30-40-30 14 10 26 20 40 30zm0 0c8-18 26-26 42-24-14 8-28 16-42 24z`}
            fill="#6DBB5E"
          />
        </g>
      ))}

      {/* Foreground greenery */}
      <path
        d="M0 300v-18c30-14 60-14 90-4 30-16 70-16 100 0 30-12 60-12 90 2 40-14 80-12 110 2h660c30-14 70-14 100 0 30-12 60-12 90 0 30-16 70-14 100 2 30-10 60-8 100 4v12z"
        fill="#A9D79A"
        stroke={NAVY}
        strokeWidth="2"
      />
    </svg>
  );
}
