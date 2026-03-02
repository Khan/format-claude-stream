import {Colorizer} from "../ports/colorizer.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class ToolUseError implements ClaudeIOEvent {
    constructor(private readonly message: string) {}

    format(colorizer: Colorizer): string {
        return colorizer.error(this.message);
    }
}
