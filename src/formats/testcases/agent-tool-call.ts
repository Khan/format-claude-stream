import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";
import {AgentToolCall} from "../../core/events/agent-tool-call.ts";

export const data = {
    type: "assistant",
    message: {
        model: "claude-sonnet-4-6",
        id: "msg_01P2vFbXJPuHdnEFAZN4JGzW",
        type: "message",
        role: "assistant",
        content: [
            {
                type: "tool_use",
                id: "toolu_01Udjr8KJAR6ZQbFRrjLJ31H",
                name: "Agent",
                input: {
                    description: "Peer review schema change",
                    prompt: "this is the prompt",
                },
                caller: {type: "direct"},
            },
        ],
        stop_reason: null,
        stop_sequence: null,
        stop_details: null,
        usage: {
            input_tokens: 1,
            cache_creation_input_tokens: 299,
            cache_read_input_tokens: 28539,
            cache_creation: {
                ephemeral_5m_input_tokens: 299,
                ephemeral_1h_input_tokens: 0,
            },
            output_tokens: 2,
            service_tier: "standard",
            inference_geo: "not_available",
        },
        context_management: null,
    },
    parent_tool_use_id: null,
    session_id: "33ef6871-ddba-40a2-ac0d-27ca00fadae7",
    uuid: "d2514bb5-3154-43f5-a2f2-862a9ff995d2",
};

export const expected: ClaudeIOEvent[] = [
    new AgentToolCall({
        toolUseId: "toolu_01Udjr8KJAR6ZQbFRrjLJ31H",
        description: "Peer review schema change",
        prompt: "this is the prompt",
    }),
];
