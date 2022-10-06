import {
  VideoPlay,
  VideoPause,
  Calendar,
  Close,
  Check,
} from "@element-plus/icons-vue";
import type { DefineComponent } from "vue";

export const StatusList = [
  "planning",
  "started",
  "paused",
  "finished",
  "abondoned",
] as const;

export const statusIconMap: Record<typeof StatusList[number], DefineComponent> =
  {
    started: VideoPlay,
    paused: VideoPause,
    planning: Calendar,
    abondoned: Close,
    finished: Check,
  };
