import * as z from "zod";
import {StreamLine} from "./formats/stream-line.ts";
import {Output} from "./output.type.ts";
import type {AssistantLine} from "./formats/stream-line.ts";
import {
    ThinkingMessageContent,
    ToolUseMessageContent,
} from "./formats/assistant-message-content.ts";
import {
    BashToolCall,
    EditToolCall,
    GrepToolCall,
    ReadToolCall,
    ToolCall,
} from "./formats/tool-calls.ts";

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
            case "Grep":
                await this.writeGrepToolCall(toolCall);
                return;
        }
    }

    private async writeThinkingMessageContent(
        data: z.infer<typeof ThinkingMessageContent>,
    ) {
        await this.writeLine(`Thinking: ${data.thinking}`);
    }

    private async writeBashToolCall(toolCall: z.infer<typeof BashToolCall>) {
        await this.writeLine(
            `${toolCall.input.description}:\n${toolCall.name}: ${toolCall.input.command}`,
        );
    }

    private async writeReadToolCall(toolCall: z.infer<typeof ReadToolCall>) {
        await this.writeLine(`Read: ${toolCall.input.file_path}`);
    }

    private async writeEditToolCall(toolCall: z.infer<typeof EditToolCall>) {
        await this.writeLine(`Edit: ${toolCall.input.file_path}`);
    }

    private async writeGrepToolCall(toolCall: z.infer<typeof GrepToolCall>) {
        const escapedPattern = toolCall.input.pattern.replace(/[/]/g, "\\/");
        await this.writeLine(
            `Grep: /${escapedPattern}/ in ${toolCall.input.path}`,
        );
    }

    private async writeLine(text: string) {
        await this.output.write(text + "\n");
    }
}
