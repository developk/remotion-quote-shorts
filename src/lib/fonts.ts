import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";

// UI font — labels, small text
export const { fontFamily: uiFont } = loadInter("normal", {
  weights: ["500"],
});
export const { fontFamily: uiFontBold } = loadInter("normal", {
  weights: ["700"],
});

// Serif font — cinematic quotes
export const { fontFamily: serifFont } = loadPlayfair("normal", {
  weights: ["600"],
});
