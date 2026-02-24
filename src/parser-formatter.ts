import * as z from "zod";
import {StreamLine, ToolCall} from "./formats/stream-line.ts";
import {Output} from "./output.type.ts";
import type {
    AssistantLine,
    BashToolCall,
    EditToolCall,
    ReadToolCall,
    ThinkingMessageContent,
    ToolUseMessageContent,
} from "./formats/stream-line.ts";

export class ParserFormatter {
    constructor(private output: Output) {}

    async write(data: string): Promise<void> {
        const parsed = StreamLine.safeParse(JSON.parse(data));

        if (!parsed.success) {
            // TODO: write the raw JSON
            return;
        }

        switch (parsed.data.type) {
            case "assistant":
                await this.writeAssistantLine(parsed.data);
        }
    }

    private async writeAssistantLine(data: z.infer<typeof AssistantLine>) {
        for (const content of data.message.content) {
            switch (content.type) {
                case "tool_use":
                    await this.writeToolUseMessageContent(content);
                    return;
                case "thinking":
                    await this.writeThinkingMessageContent(content);
                    return;
            }
        }
    }

    private async writeToolUseMessageContent(
        data: z.infer<typeof ToolUseMessageContent>,
    ) {
        const toolCall = ToolCall.parse(data);

        switch (toolCall.name) {
            case "Bash":
                await this.writeBashToolCall(toolCall);
                return;
            case "Read":
                await this.writeReadToolCall(toolCall);
                return;
            case "Edit":
                await this.writeEditToolCall(toolCall);
                return;
        }
    }

    private async writeThinkingMessageContent(
        data: z.infer<typeof ThinkingMessageContent>,
    ) {
        await this.output.write(`Thinking: ${data.thinking}\n`);
    }

    private async writeBashToolCall(toolCall: z.infer<typeof BashToolCall>) {
        await this.output.write(
            `${toolCall.input.description}:\n${toolCall.name}: ${toolCall.input.command}\n`,
        );
    }

    private async writeReadToolCall(toolCall: z.infer<typeof ReadToolCall>) {
        await this.output.write(`Read: ${toolCall.input.file_path}\n`);
    }

    private async writeEditToolCall(toolCall: z.infer<typeof EditToolCall>) {
        await this.output.write(`Edit: ${toolCall.input.file_path}\n`);
    }
}
