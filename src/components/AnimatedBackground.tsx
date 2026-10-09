import React from "react";
import {
  AbsoluteFill,
  Img,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import type { Theme } from "../lib/themes";

export type BackgroundMode = "aurora" | "particles" | "video";

const Particles: React.FC<{ count: number; seed: string; color: string }> = ({
  count,
  seed,
  color,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const x = random(`${seed}-x-${i}`) * width;
        const size = 3 + random(`${seed}-s-${i}`) * 9;
        const speed = 0.3 + random(`${seed}-v-${i}`) * 1.1;
        const phase = random(`${seed}-p-${i}`) * height;
        const drift = (random(`${seed}-d-${i}`) - 0.5) * 60;
        const y =
          height - ((phase + frame * speed * 2) % (height + 80)) + 40;
        const opacity = 0.12 + random(`${seed}-o-${i}`) * 0.3;
        const flicker =
          0.75 +
          0.25 *
            Math.sin(
              (frame / durationInFrames) * Math.PI * 4 +
                random(`${seed}-f-${i}`) * Math.PI * 2,
            );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + drift * Math.sin(frame / 90 + i),
              top: y,
              width: size,
              height: size,
              borderRadius: size / 2,
              background: color,
              opacity: opacity * flicker,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
          />
        );
      })}
    </>
  );
};

export const AnimatedBackground: React.FC<{
  theme: Theme;
  mode?: BackgroundMode;
  videoSrc?: string;
  dimVideo?: number;
  particleCount?: number;
}> = ({
  theme,
  mode = "aurora",
  videoSrc,
  dimVideo = 0.72,
  particleCount = 34,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const shift = Math.sin(t * 0.35) * 18;
  const shift2 = Math.cos(t * 0.22) * 14;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.gradient[0]}, ${theme.gradient[1]} 55%, ${theme.gradient[2]})`,
        overflow: "hidden",
      }}
    >
      {mode === "video" && videoSrc ? (
        <AbsoluteFill style={{ opacity: 1 - dimVideo }}>
          <Video
            src={videoSrc}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
            muted
            loop
          />
        </AbsoluteFill>
      ) : null}

      {mode !== "video" ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "-20%",
              background: `radial-gradient(ellipse ${60 + shift}% ${45}% at ${30 + shift}% ${25 + shift2}%, ${theme.accent}26, transparent 65%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "-20%",
              background: `radial-gradient(ellipse 55% 45% at ${72 - shift}% ${78 - shift2}%, ${theme.accentAlt}22, transparent 60%)`,
            }}
          />
        </>
      ) : null}

      {mode === "particles" || mode === "aurora" ? (
        <Particles count={particleCount} seed="bg" color={theme.accent} />
      ) : null}

      {/* Film grain */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      >
        <Img
          src={staticFile("noise.svg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 320px 60px rgba(0,0,0,0.55)",
        }}
      />
    </AbsoluteFill>
  );
};
