import {Colorizer} from "../ports/colorizer.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class TextOutput implements ClaudeIOEvent {
    constructor(private readonly text: string) {}

    format(colorizer: Colorizer) {
        return colorizer.claudeSpeaking(`${this.text}`);
    }
}
