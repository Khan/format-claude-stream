import {ClaudeIOEvent} from "../../core/events/claude-io-event.type.js";

export const data = {
    type: "tool_progress",
    tool_use_id: "toolu_01PC9cw9UDzdjQqqyFkpPACs-heartbeat-2",
    tool_name: "Bash",
    parent_tool_use_id: "toolu_01PC9cw9UDzdjQqqyFkpPACs",
    elapsed_time_seconds: 90,
    heartbeat: true,
    uuid: "1b981eed-f2b7-4e51-8c2b-5f8a22c69fc6",
    session_id: "40b84b35-bda9-4d80-ab43-ebae7f088592",
};

export const expected: ClaudeIOEvent[] = [];
