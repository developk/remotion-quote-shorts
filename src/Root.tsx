import "./index.css";
import { Composition, Folder } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./lib/constants";
import {
  QuoteVideo,
  quoteVideoCalculateMetadata,
  quoteVideoSchema,
} from "./templates/QuoteVideo";
import { props as quote1 } from "./content/my-quote";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Videos">
      <Composition
        id="QuoteVideo"
        component={QuoteVideo}
        durationInFrames={300}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={quoteVideoSchema}
        defaultProps={quote1}
        calculateMetadata={quoteVideoCalculateMetadata}
      />
    </Folder>
  );
};
