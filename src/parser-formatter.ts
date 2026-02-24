import * as z from "zod";
import {StreamLine, ToolCall} from "./formats/stream-line.ts";
import {Output} from "./output.type.ts";
import type {AssistantLine} from "./formats/stream-line.ts";

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
                this.writeAssistantLine(parsed.data);
        }
    }

    private writeAssistantLine(data: z.infer<typeof AssistantLine>) {
        for (const content of data.message.content) {
            const toolCall = ToolCall.parse(content);

            this.output.write(
                `${toolCall.input.description}:\n${content.name}: ${toolCall.input.command}\n`,
            );
        }
    }
}
