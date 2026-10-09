import React from "react";
import { z } from "zod";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { themeNameSchema, themes, type Theme } from "../lib/themes";
import { FPS } from "../lib/constants";
import { serifFont, uiFont, uiFontBold } from "../lib/fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const quoteVideoSchema = z.object({
  theme: themeNameSchema,
  quote: z.string(),
  author: z.string(),
  authorTitle: z.string(),
  cta: z.string(),
  /** Set false when embedding this template inside another composition */
  showCta: z.boolean().optional(),
});

export type QuoteVideoProps = z.infer<typeof quoteVideoSchema>;

export const quoteVideoDefaultProps: QuoteVideoProps = {
  theme: "paper",
  quote:
    "You have power over your mind, not outside events. Realize this, and you will find strength.",
  author: "Marcus Aurelius",
  authorTitle: "Meditations",
  cta: "Daily stoic wisdom — follow",
};

const INTRO_MS = 700;
const WORD_STAGGER_MS = 260;
const WORD_MS = 150;
const AUTHOR_DELAY_MS = 700;
const HOLD_MS = 2200;

export const quoteVideoCalculateMetadata = async ({
  props,
}: {
  props: QuoteVideoProps;
}) => {
  const words = props.quote.split(/\s+/).filter(Boolean).length;
  const totalMs =
    INTRO_MS +
    words * WORD_STAGGER_MS +
    WORD_MS +
    AUTHOR_DELAY_MS +
    HOLD_MS;
  return { durationInFrames: Math.ceil((totalMs / 1000) * FPS) };
};

const QuoteBody: React.FC<{ props: QuoteVideoProps; theme: Theme }> = ({
  props,
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = props.quote.split(/\s+/).filter(Boolean);

  const lastWordAt = INTRO_MS + words.length * WORD_STAGGER_MS;
  const authorAt = lastWordAt + AUTHOR_DELAY_MS;

  const quoteMarkEnter = interpolate(
    frame,
    [0, 16],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );

  const authorEnter = interpolate(
    frame,
    [(authorAt / 1000) * fps, (authorAt / 1000) * fps + 14],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  // Slow cinematic push-in across the whole video
  const { durationInFrames } = useVideoConfig();
  const push = interpolate(frame, [0, durationInFrames], [1, 1.06]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        scale: push,
        padding: "0 90px",
      }}
    >
      <div
        style={{
          fontFamily: serifFont,
          fontSize: 200,
          lineHeight: 0.6,
          color: theme.accent,
          opacity: quoteMarkEnter * 0.9,
          marginBottom: 30,
        }}
      >
        “
      </div>
      <div
        style={{
          fontFamily: serifFont,
          fontSize: 68,
          fontWeight: 600,
          color: theme.text,
          textAlign: "center",
          lineHeight: 1.45,
          maxWidth: 920,
        }}
      >
        {words.map((word, i) => {
          const at = ((INTRO_MS + i * WORD_STAGGER_MS) / 1000) * fps;
          const enter = interpolate(frame, [at, at + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: enter,
                translate: `0 ${(1 - enter) * 18}px`,
                marginRight: "0.28em",
                filter: `blur(${(1 - enter) * 6}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: authorEnter,
          translate: `0 ${(1 - authorEnter) * 16}px`,
        }}
      >
        <div
          style={{
            width: 90,
            height: 3,
            background: theme.accent,
          }}
        />
        <div
          style={{
            fontFamily: uiFontBold,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: theme.text,
          }}
        >
          {props.author}
        </div>
        <div
          style={{
            fontFamily: uiFont,
            fontSize: 32,
            color: theme.muted,
            letterSpacing: "0.06em",
          }}
        >
          {props.authorTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const QuoteVideo: React.FC<QuoteVideoProps> = (props) => {
  const theme = themes[props.theme];
  const { fps, durationInFrames } = useVideoConfig();
  const ctaFrom = durationInFrames - Math.round(1.6 * fps);

  return (
    <AbsoluteFill>
      <AnimatedBackground theme={theme} mode="aurora" particleCount={22} />
      <QuoteBody props={props} theme={theme} />
      {props.showCta !== false ? (
        <Sequence from={ctaFrom} name="CTA" layout="none">
          <CtaLine text={props.cta} theme={theme} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

const CtaLine: React.FC<{ text: string; theme: Theme }> = ({ text, theme }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        width: "100%",
        textAlign: "center",
        fontFamily: uiFont,
        fontSize: 34,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: theme.muted,
        opacity: enter,
      }}
    >
      {text}
    </div>
  );
};
