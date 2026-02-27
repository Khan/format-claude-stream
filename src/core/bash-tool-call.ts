import {Colorizer} from "./colorizer.ts";
import {ClaudeIOEvent} from "./claude-io-event.type.ts";

export class BashToolCall implements ClaudeIOEvent {
    constructor(private readonly command: string) {}

    format(colorizer: Colorizer): string {
        return colorizer.importantAction(`$ ${this.command}`);
    }
}
