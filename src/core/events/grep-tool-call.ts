import {ClaudeIOEvent, FormattingContext} from "./claude-io-event.type.ts";

export interface ConstructorParams {
    pattern: string;
    path?: string | undefined;
    toolUseId: string;
}

export class GrepToolCall implements ClaudeIOEvent {
    public readonly pattern: string;
    public readonly path: string | undefined;
    public readonly toolUseId: string;

    constructor({pattern, path, toolUseId}: ConstructorParams) {
        this.pattern = pattern;
        this.path = path;
        this.toolUseId = toolUseId;
    }

    format({colorizer}: FormattingContext): string {
        return colorizer.action(
            `Grep: /${escape(this.pattern)}/ in ${this.path ?? "."}`,
        );
    }
}

function escape(pattern: string): string {
    return pattern.replace(/[/]/g, "\\/");
}
