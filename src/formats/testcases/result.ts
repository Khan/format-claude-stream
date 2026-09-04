import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.js";

export const data = {
    type: "result",
    subtype: "success",
    is_error: false,
    result: "I've updated the tests and they pass.",
    session_id: "4bef8ebb-305b-446b-8e8a-dd79f3020e5e",
    uuid: "0f6f5f2c-4c53-4b7f-9d0a-6b0f5d3c1a11",
};

export const expected: ClaudeIOEvent[] = [];
