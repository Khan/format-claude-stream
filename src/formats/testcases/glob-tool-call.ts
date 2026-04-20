import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";
import {GlobToolCall} from "../../core/events/glob-tool-call.ts";

export const data = {
    type: "assistant",
    message: {
        model: "claude-sonnet-4-6",
        id: "msg_01DYGcauivGBWrC5w7qupxEK",
        type: "message",
        role: "assistant",
        content: [
            {
                type: "tool_use",
                id: "toolu_01HUakmkkhpgdE6FJ3e4DAcn",
                name: "Glob",
                input: {pattern: "**/*.ts", path: "/Users/ben/khan/perseus"},
                caller: {type: "direct"},
            },
        ],
        stop_reason: null,
        stop_sequence: null,
        stop_details: null,
        usage: {
            input_tokens: 1,
            cache_creation_input_tokens: 2587,
            cache_read_input_tokens: 19270,
            cache_creation: {
                ephemeral_5m_input_tokens: 2587,
                ephemeral_1h_input_tokens: 0,
            },
            output_tokens: 11,
            service_tier: "standard",
            inference_geo: "not_available",
        },
        context_management: null,
    },
    parent_tool_use_id: null,
    session_id: "30878cfd-42fc-4233-b906-b2c71940e511",
    uuid: "8f21e9e2-5d48-47ea-b25d-a7e65d1bb8f9",
};

export const expected: ClaudeIOEvent[] = [
    new GlobToolCall({
        toolUseId: "toolu_01HUakmkkhpgdE6FJ3e4DAcn",
        pattern: "**/*.ts",
        path: "/Users/ben/khan/perseus",
    }),
];
