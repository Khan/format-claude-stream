import {Colorizer} from "./colorizer.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class EditToolCall implements ClaudeIOEvent {
    constructor(private readonly path: string) {}

    format(colorizer: Colorizer): string {
        return colorizer.importantAction(`Edit: ${this.path}`);
    }
}
