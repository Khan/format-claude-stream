import {Colorizer} from "./colorizer.ts";

export interface ClaudeIOEvent {
    format(colorizer: Colorizer): string;
}
