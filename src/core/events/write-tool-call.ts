import {ClaudeIOEvent} from "./claude-io-event.type.ts";
import {Colorizer} from "../ports/colorizer.ts";

export interface ConstructorParams {
    path: string;
    toolUseId: string;
}

export class WriteToolCall implements ClaudeIOEvent {
    public readonly path: string;
    public readonly toolUseId: string;

    constructor({path, toolUseId}: ConstructorParams) {
        this.path = path;
        this.toolUseId = toolUseId;
    }

    format(colorizer: Colorizer): string {
        return colorizer.importantAction(`Write: ${this.path}`);
    }
}
