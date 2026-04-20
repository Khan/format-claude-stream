import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";
import {WriteToolCall} from "../../core/events/write-tool-call.ts";

export const data = {
    type: "assistant",
    message: {
        model: "claude-sonnet-4-6",
        id: "msg_01VkuWjNGMPfAYtRbSr6VfTq",
        type: "message",
        role: "assistant",
        content: [
            {
                type: "tool_use",
                id: "toolu_01JRLfmG6dhMsrzuszPVQNRJ",
                name: "Write",
                input: {
                    file_path: "/Users/ben/khan/commit-message.txt",
                    content: "Plan 'go' subcommand",
                },
                caller: {type: "direct"},
            },
        ],
        stop_reason: null,
        stop_sequence: null,
        stop_details: null,
        usage: {
            input_tokens: 1,
            cache_creation_input_tokens: 423,
            cache_read_input_tokens: 43560,
            cache_creation: {
                ephemeral_5m_input_tokens: 423,
                ephemeral_1h_input_tokens: 0,
            },
            output_tokens: 48,
            service_tier: "standard",
            inference_geo: "not_available",
        },
        context_management: null,
    },
    parent_tool_use_id: null,
    session_id: "30878cfd-42fc-4233-b906-b2c71940e511",
    uuid: "202fc339-6f8f-4c9b-a46c-bab6a63c65b1",
};

export const expected: ClaudeIOEvent[] = [
    new WriteToolCall({
        path: "/Users/ben/khan/commit-message.txt",
        toolUseId: "toolu_01JRLfmG6dhMsrzuszPVQNRJ",
    }),
];
