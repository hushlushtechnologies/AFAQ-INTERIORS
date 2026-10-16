import type { ArrowShape } from "@/components/motion/ScrollArrow";

export const arrowUp: ArrowShape = {
  viewBox: "0 0 240 130",
  d: "M2 126 C 60 126, 120 112, 170 80 S 220 30, 232 8",
  head: "M224 9 L235 1 L234 14 Z",
};

export const arrowDown: ArrowShape = {
  viewBox: "0 0 200 90",
  d: "M2 4 C 30 20, 50 60, 110 74 S 170 86, 192 84",
  head: "M188 78 L200 84 L188 90 Z",
};

export const arrowSmall: ArrowShape = {
  viewBox: "0 0 120 48",
  d: "M2 42 C 40 46, 80 36, 110 8",
  head: "M104 4 L117 3 L111 15 Z",
};

export const arrowLong: ArrowShape = {
  viewBox: "0 0 220 140",
  d: "M4 136 C 60 120, 100 80, 120 50 S 170 6, 210 4",
  head: "M206 -2 L219 4 L206 10 Z",
  dot: { cx: 4, cy: 136 },
};