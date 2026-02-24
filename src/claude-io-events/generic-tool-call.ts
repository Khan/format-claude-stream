import {Colorizer} from "../colorizer.type.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class GenericToolCall implements ClaudeIOEvent {
    constructor(
        private readonly toolName: string,
        private readonly params: unknown,
    ) {}

    format(colorizer: Colorizer) {
        const color = colorizer.hex("#88aa88");
        return color(`${this.toolName}: ${JSON.stringify(this.params)}`);
    }
}
