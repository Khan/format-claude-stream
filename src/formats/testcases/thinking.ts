import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";
import {Thinking} from "../../core/events/thinking.ts";

export const data = {
    type: "assistant",
    message: {
        model: "claude-sonnet-4-6",
        id: "msg_01DQpMFcvgSuWmE3Tm9V4BaE",
        type: "message",
        role: "assistant",
        content: [
            {
                type: "thinking",
                thinking:
                    "Let me start by running all the tests to see if any fail.",
                signature:
                    "EuEBCkYICxgCKkCRYVdOxu2bgvMRNz1mgsMAUyO8QQahvSjnuXLEmK34uKCgJdyfcFq6NbkLUiY1ryo8SfjSHBlY9xQ571rL9RGMEgzYSHjGIextYzP7m/caDPEj8KRDlGoE5DtnkSIwIKrXRzoOktpoR0Zto2SjN3RV7O8/eQfD2xzYg88JbE6wE/SiR69+b8xSWgaNPFnlKkm449+Nl+SFDbk1PrPQ/kAvywsSFat33AppXlh6eQgHEz7Ml+pnfY1cslwkLohm6YcNOj5h9gP3mgx7jzUqJIOoUj8Atvoqh+RkGAE=",
            },
        ],
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
        context_management: null,
    },
    parent_tool_use_id: null,
    session_id: "4bef8ebb-305b-446b-8e8a-dd79f3020e5e",
    uuid: "86392526-5733-424a-88c2-b6371a8af4a1",
};

export const expected: ClaudeIOEvent[] = [
    new Thinking("Let me start by running all the tests to see if any fail."),
];
