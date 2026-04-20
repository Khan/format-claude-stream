import {ClaudeIOEvent, FormattingContext} from "./claude-io-event.type.ts";

export interface ConstructorParams {
    path: string;
    toolUseId: string;
}

export class EditToolCall implements ClaudeIOEvent {
    public readonly path: string;
    public readonly toolUseId: string;

    constructor({path, toolUseId}: ConstructorParams) {
        this.path = path;
        this.toolUseId = toolUseId;
    }

    format({colorizer}: FormattingContext): string {
        return colorizer.importantAction(`Edit: ${this.path}`);
    }
}
