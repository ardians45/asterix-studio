/** Organic liquid blob that slowly morphs (SVG SMIL, no JS). Same command list in every frame. */
const A =
  "M120 200C120 110 230 60 320 90C410 120 520 90 540 180C560 270 470 330 380 320C290 310 250 360 170 330C90 300 120 260 120 200Z";
const B =
  "M150 185C160 105 255 75 335 105C415 135 505 125 525 205C545 285 455 315 365 300C285 288 225 345 155 312C95 284 140 250 150 185Z";
const C =
  "M110 215C105 125 215 85 305 80C395 75 515 110 535 195C555 280 480 345 390 330C300 315 260 345 180 340C100 335 115 290 110 215Z";

export function LiquidBlob({
  className = "",
  fill = "currentColor",
  duration = 9,
  style,
}: {
  className?: string;
  fill?: string;
  duration?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="80 50 500 320" className={className} style={style} aria-hidden="true" focusable="false">
      <path d={A} fill={fill} className="pf-blob-path">
        <animate attributeName="d" dur={`${duration}s`} repeatCount="indefinite" values={`${A};${B};${C};${A}`} calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1" />
      </path>
    </svg>
  );
}

/** A thick monoline curl, like a drip of ink swirling off the blob. */
export function InkCurl({
  className = "",
  stroke = "currentColor",
  style,
}: {
  className?: string;
  stroke?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 420 360" className={className} style={style} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M20 340C110 270 250 320 300 230C340 160 270 100 215 140C170 172 200 236 255 226C300 218 320 170 300 140"
        stroke={stroke}
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pf-curl-path"
      />
    </svg>
  );
}
