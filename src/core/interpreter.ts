import {ClaudeIOEvent} from "./events/claude-io-event.type.ts";
import {ToolUseSuccess} from "./events/tool-use-success.ts";
import {ReadToolCall} from "./events/read-tool-call.ts";
import {EditToolCall} from "./events/edit-tool-call.ts";
import {Colorizer} from "./ports/colorizer.ts";
import {Output} from "./ports/output.ts";

export class Interpreter {
    private readonly readToolUseIds = new Set<string>();
    private readonly editToolUseIds = new Set<string>();
    private lastProcessedEvent: ClaudeIOEvent | null = null;

    constructor(
        private readonly output: Output,
        private readonly colorizer: Colorizer,
    ) {}

    async process(event: ClaudeIOEvent): Promise<void> {
        if (this.isReadToolCall(event)) {
            this.readToolUseIds.add(event.toolUseId);
        }
        if (this.isEditToolCall(event)) {
            this.editToolUseIds.add(event.toolUseId);
        }
        if (this.isReadResult(event)) {
            this.lastProcessedEvent = event;
            return;
        }
        if (this.isEditResult(event)) {
            this.lastProcessedEvent = event;
            return;
        }
        if (this.lastProcessedEvent && !(event instanceof ToolUseSuccess)) {
            await this.output.write("\n");
        }

        this.lastProcessedEvent = event;
        return this.output.write(event.format(this.colorizer) + "\n");
    }

    private isEditToolCall(event: ClaudeIOEvent) {
        return event instanceof EditToolCall;
    }

    private isReadToolCall(event: ClaudeIOEvent) {
        return event instanceof ReadToolCall;
    }

    private isReadResult(event: ClaudeIOEvent) {
        return (
            event instanceof ToolUseSuccess &&
            this.readToolUseIds.has(event.toolUseId)
        );
    }

    private isEditResult(event: ClaudeIOEvent) {
        return (
            event instanceof ToolUseSuccess &&
            this.editToolUseIds.has(event.toolUseId)
        );
    }
}
