import {Colorizer} from "../colorizer.type.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class ReadToolCall implements ClaudeIOEvent {
    constructor(private readonly path: string) {}

    format(colorizer: Colorizer) {
        const color = colorizer.hex("#88aa88");
        return color(`Reading ${this.path} ...`);
    }
}
