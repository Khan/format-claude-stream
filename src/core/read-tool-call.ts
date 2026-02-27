import {Colorizer} from "./colorizer.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class ReadToolCall implements ClaudeIOEvent {
    constructor(private readonly path: string) {}

    format(colorizer: Colorizer) {
        return colorizer.action(`Read: ${this.path}`);
    }
}
