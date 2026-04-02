import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.ts";
import {ToolUseSuccess} from "../../core/events/tool-use-success.ts";

export const data = {
    type: "user",
    message: {
        role: "user",
        content: [
            {
                tool_use_id: "toolu_01K5oTEbkgs39QHPfZbeesH9",
                type: "tool_result",
                content: [
                    {
                        type: "text",
                        text: "lgtm",
                    },
                    {
                        type: "text",
                        text: "agentId: aed4a44 (for resuming to continue this agent's work if needed)\n<usage>total_tokens: 27290\ntool_uses: 12\nduration_ms: 73284</usage>",
                    },
                ],
            },
        ],
    },
    parent_tool_use_id: null,
    session_id: "3fc967fb-c72a-4d3a-b5cf-91ab7c2ef6ce",
    uuid: "7ef4ba8c-8f63-4d66-adea-6a933904049d",
    tool_use_result: {
        status: "completed",
        prompt: "You are a code reviewer. Review the diff of changes to `foo.ts`.",
        agentId: "aed4a44",
        content: [
            {
                type: "text",
                text: "lgtm",
            },
        ],
        totalDurationMs: 73284,
        totalTokens: 27290,
        totalToolUseCount: 12,
        usage: {
            input_tokens: 1,
            cache_creation_input_tokens: 207,
            cache_read_input_tokens: 25268,
            output_tokens: 1814,
            server_tool_use: {web_search_requests: 0, web_fetch_requests: 0},
            service_tier: "standard",
            cache_creation: {
                ephemeral_1h_input_tokens: 0,
                ephemeral_5m_input_tokens: 207,
            },
            inference_geo: "",
            iterations: [],
            speed: "standard",
        },
    },
};

export const expected: ClaudeIOEvent[] = [
    new ToolUseSuccess({
        toolUseId: "toolu_01K5oTEbkgs39QHPfZbeesH9",
        toolOutput:
            "lgtm\n\nagentId: aed4a44 (for resuming to continue this agent's work if needed)\n<usage>total_tokens: 27290\ntool_uses: 12\nduration_ms: 73284</usage>",
    }),
];
