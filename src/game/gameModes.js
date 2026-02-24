import { CaptureMode } from "./modes/captureMode";

export const GAME_MODES = {
    capture: {
        label: "Capture the Canvas",
        engine: CaptureMode,
        description: "Paint over everything. Most tiles wins.",
    },

    // territory: {
    //     label: "Territory Wars",
    //     engine: TerritoryMode,
    //     description: "Expand from your territory and convert enemies.",
    //   },
}