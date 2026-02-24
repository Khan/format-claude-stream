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

export const GrepToolCall = z.object({
    name: z.literal("Grep"),
    input: z.object({
        path: z.optional(z.string()),
        pattern: z.string(),
    }),
});

export const ToolCall = z.discriminatedUnion("name", [
    BashToolCall,
    EditToolCall,
    GrepToolCall,
    ReadToolCall,
]);

export const ToolUseMessageContent = z.object({
    type: z.literal("tool_use"),
    name: z.string(),
    input: z.any(),
});

export const ThinkingMessageContent = z.object({
    type: z.literal("thinking"),
    thinking: z.string(),
});

const MessageContent = z.discriminatedUnion("type", [
    ThinkingMessageContent,
    ToolUseMessageContent,
]);

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

const UserLine = z.object({
    type: z.literal("user"),
});

export const StreamLine = z.discriminatedUnion("type", [
    AssistantLine,
    ResultLine,
    StreamEventLine,
    UserLine,
]);
