import {Colorizer} from "../colorizer.type.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class EditToolCall implements ClaudeIOEvent {
    constructor(private readonly path: string) {}

    format(colorizer: Colorizer): string {
        const color = colorizer.hex("#88aa88");
        return color(`Editing ${this.path} ...`);
    }
}
