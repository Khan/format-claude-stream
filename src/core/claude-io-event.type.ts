import {Colorizer} from "./ports/colorizer.ts";

export interface ClaudeIOEvent {
    format(colorizer: Colorizer): string;
}
