// The Morrow sky: roast level is a time of morning. Each hour maps to a flat sky colour.
const STOPS: [number, string][] = [
  [5, "#1B120C"],
  [6.5, "#4A1F12"],
  [7.25, "#C23A12"],
  [8, "#E8792B"],
  [9, "#F2B233"],
  [10.25, "#F3D9A0"],
  [11, "#F3EBDC"],
];

const INK = "#1B120C";
const PAPER = "#F3EBDC";

const toRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb: number[]) =>
  "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

export const skyColor = (hour: number): string => {
  const h = Math.min(Math.max(hour, STOPS[0][0]), STOPS[STOPS.length - 1][0]);
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [h0, c0] = STOPS[i];
    const [h1, c1] = STOPS[i + 1];
    if (h >= h0 && h <= h1) {
      const t = (h - h0) / (h1 - h0);
      const a = toRgb(c0);
      const b = toRgb(c1);
      return toHex(a.map((v, k) => v + (b[k] - v) * t));
    }
  }
  return STOPS[STOPS.length - 1][1];
};

/** Whichever of ink or paper reads better on the given sky colour. */
export const onSky = (bg: string): string =>
  contrast(PAPER, bg) >= contrast(INK, bg) ? PAPER : INK;

export const formatHour = (hour: number): string => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const phaseName = (hour: number): string => {
  if (hour < 6) return "Before light";
  if (hour < 7) return "First light";
  if (hour < 8) return "Sunrise";
  if (hour < 9.5) return "Morning";
  return "High morning";
};
