/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Hardware-accelerated encoding (VideoToolbox on macOS, NVENC on Win/Linux).
// 'if-possible' falls back to software encoding when no GPU encoder exists.
Config.setHardwareAcceleration("if-possible");
// HW encoders don't support CRF; bitrate keeps file size near libx264 output.
Config.setVideoBitrate("8M");
// GPU rasterization for gradients/blur/shadows (ANGLE→Metal). CI runners have
// no GPU and Remotion 4.x fails there — skip on CI only.
if (!process.env.CI) {
  Config.setChromiumOpenGlRenderer("angle");
}
