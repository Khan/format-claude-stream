import * as z from "zod";

export const EditToolCall = z.object({
    name: z.literal("Edit"),
    input: z.object({
        file_path: z.string(),
    }),
});

export const ReadToolCall = z.object({
    name: z.literal("Read"),
    input: z.object({
        file_path: z.string(),
    }),
});

export const BashToolCall = z.object({
    name: z.literal("Bash"),
    input: z.object({
        command: z.string(),
        description: z.string(),
        timeout: z.optional(z.number()),
    }),
});

export const ToolCall = z.discriminatedUnion("name", [
    BashToolCall,
    EditToolCall,
    ReadToolCall,
]);

const ToolUseMessageContent = z.object({
    type: z.literal("tool_use"),
    name: z.string(),
    input: z.any(),
});

const MessageContent = z.discriminatedUnion("type", [ToolUseMessageContent]);

export const AssistantLine = z.object({
    type: z.literal("assistant"),
    message: z.object({
        type: z.literal("message"),
        content: z.array(MessageContent),
    }),
});

const ResultLine = z.object({
    type: z.literal("result"),
});

const StreamEventLine = z.object({
    type: z.literal("stream_event"),
});

const User = z.object({
    type: z.literal("user"),
});

export const StreamLine = z.discriminatedUnion("type", [
    AssistantLine,
    ResultLine,
    StreamEventLine,
    User,
]);
