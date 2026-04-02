import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";

export const data = {
    type: "user",
    message: {
        role: "user",
        content: [
            {
                type: "text",
                text: "You are a code reviewer.",
            },
        ],
    },
    parent_tool_use_id: "toolu_01K5oTEbkgs39QHPfZbeesH9",
    session_id: "3fc967fb-c72a-4d3a-b5cf-91ab7c2ef6ce",
    uuid: "53ef38c5-2221-4b42-93c5-8d40f151c2d9",
};

export const expected: ClaudeIOEvent[] = [];
