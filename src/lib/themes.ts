import { z } from "zod";

export const themeNameSchema = z.enum([
  "midnight",
  "neon",
  "sunset",
  "paper",
  "terminal",
]);

export type ThemeName = z.infer<typeof themeNameSchema>;

export interface Theme {
  /** Gradient stops used by AnimatedBackground */
  gradient: [string, string, string];
  /** Primary text color */
  text: string;
  /** Accent color — highlights, buttons, emphasis */
  accent: string;
  /** Secondary accent for gradient text / underlines */
  accentAlt: string;
  /** Caption word highlight color */
  highlight: string;
  /** Card / bubble surface */
  surface: string;
  /** Text on top of accent surfaces */
  onAccent: string;
  /** Muted text */
  muted: string;
}

export const themes: Record<ThemeName, Theme> = {
  midnight: {
    gradient: ["#0b1026", "#131a3a", "#1b2350"],
    text: "#f4f6ff",
    accent: "#5eead4",
    accentAlt: "#818cf8",
    highlight: "#5eead4",
    surface: "rgba(255,255,255,0.08)",
    onAccent: "#061018",
    muted: "rgba(244,246,255,0.55)",
  },
  neon: {
    gradient: ["#070707", "#101010", "#181818"],
    text: "#fafafa",
    accent: "#d4ff3f",
    accentAlt: "#ff3fd4",
    highlight: "#d4ff3f",
    surface: "rgba(255,255,255,0.07)",
    onAccent: "#0a0a0a",
    muted: "rgba(250,250,250,0.5)",
  },
  sunset: {
    gradient: ["#1a0b2e", "#3b1154", "#76235c"],
    text: "#fff7ed",
    accent: "#fb923c",
    accentAlt: "#f472b6",
    highlight: "#fdba74",
    surface: "rgba(255,255,255,0.09)",
    onAccent: "#2a0e1f",
    muted: "rgba(255,247,237,0.55)",
  },
  paper: {
    gradient: ["#efe9dd", "#e7dfd0", "#ded4c0"],
    text: "#1c1917",
    accent: "#b45309",
    accentAlt: "#7c2d12",
    highlight: "#b45309",
    surface: "rgba(28,25,23,0.06)",
    onAccent: "#fff7ed",
    muted: "rgba(28,25,23,0.55)",
  },
  terminal: {
    gradient: ["#020c06", "#04140a", "#07210f"],
    text: "#d1fae5",
    accent: "#34d399",
    accentAlt: "#a3e635",
    highlight: "#a3e635",
    surface: "rgba(52,211,153,0.08)",
    onAccent: "#03170d",
    muted: "rgba(209,250,229,0.5)",
  },
};
