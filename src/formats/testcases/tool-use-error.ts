import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.js";
import {ToolUseError} from "../../core/events/tool-use-error.ts";

export const data = {
    type: "user",
    message: {
        role: "user",
        content: [
            {
                type: "tool_result",
                content:
                    "<tool_use_error>File has not been read yet. Read it first before writing to it.</tool_use_error>",
                is_error: true,
                tool_use_id: "toolu_0187FhS1NWAMKaojmhuqonox",
            },
        ],
    },
    parent_tool_use_id: null,
    session_id: "3d584eb2-5ebd-4cd9-8b76-cab6731c439f",
    uuid: "82436c10-580d-4618-9e8f-c51e3de7cb0d",
    tool_use_result:
        "Error: File has not been read yet. Read it first before writing to it.",
};

export const expected: ClaudeIOEvent[] = [
    new ToolUseError(
        "File has not been read yet. Read it first before writing to it.",
    ),
];
