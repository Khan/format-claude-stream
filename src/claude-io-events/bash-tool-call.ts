import {Colorizer} from "../colorizer.type.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class BashToolCall implements ClaudeIOEvent {
    constructor(private readonly command: string) {}

    format(colorizer: Colorizer): string {
        const color = colorizer.hex("#88ee88");
        return color(`$ ${this.command}`);
    }
}
