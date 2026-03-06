import {ClaudeIOEvent} from "./events/claude-io-event.type.ts";
import {ToolUseSuccess} from "./events/tool-use-success.ts";
import {ReadToolCall} from "./events/read-tool-call.ts";
import {EditToolCall} from "./events/edit-tool-call.ts";
import {Colorizer} from "./ports/colorizer.ts";
import {Output} from "./ports/output.ts";

export class Interpreter {
    private readonly readToolUseIds = new Set<string>();
    private readonly editToolUseIds = new Set<string>();
    private lastWrittenEvent: ClaudeIOEvent | null = null;

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
        if (this.isReadResult(event) || this.isEditResult(event)) {
            return;
        }
        if (this.needsBlankLineBefore(event)) {
            await this.output.write("\n");
        }
        await this.output.write(event.format(this.colorizer) + "\n");
        this.lastWrittenEvent = event;
    }

    private needsBlankLineBefore(event: ClaudeIOEvent): boolean {
        // Don't write a blank line at the very beginning of the output.
        if (this.lastWrittenEvent == null) {
            return false;
        }

        // Don't write a blank line between a tool call and its result.
        if (event instanceof ToolUseSuccess) {
            return false;
        }

        // Don't write a blank line between consecutive file operations
        if (
            this.isFileCrudOp(event) &&
            this.isFileCrudOp(this.lastWrittenEvent)
        ) {
            return false;
        }

        return true;
    }

    private isEditToolCall(event: ClaudeIOEvent) {
        return event instanceof EditToolCall;
    }

    private isReadToolCall(event: ClaudeIOEvent) {
        return event instanceof ReadToolCall;
    }

    // TODO: Fix feature envy; move isFileCrudOp to ClaudeIOEvent.
    private isFileCrudOp(event: ClaudeIOEvent) {
        return this.isReadToolCall(event) || this.isEditToolCall(event);
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
