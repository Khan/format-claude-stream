import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.js";

export const data = {
    type: "stream_event",
    event: {
        type: "message_start",
        message: {
            model: "claude-sonnet-4-6",
            id: "msg_01DQpMFcvgSuWmE3Tm9V4BaE",
            type: "message",
            role: "assistant",
            content: [],
            stop_reason: null,
            stop_sequence: null,
            usage: {
                input_tokens: 2,
                cache_creation_input_tokens: 3568,
                cache_read_input_tokens: 18456,
                cache_creation: {
                    ephemeral_5m_input_tokens: 3568,
                    ephemeral_1h_input_tokens: 0,
                },
                output_tokens: 8,
                service_tier: "standard",
                inference_geo: "not_available",
            },
        },
    },
    session_id: "4bef8ebb-305b-446b-8e8a-dd79f3020e5e",
    parent_tool_use_id: null,
    uuid: "f2a2378a-0e95-4be7-a513-77e9369ef2ee",
};

export const expected: ClaudeIOEvent[] = [];
