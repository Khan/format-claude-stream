import * as z from "zod";
import {AssistantMessage} from "./assistant-message.ts";
import {UserMessage} from "./user-message.ts";

/**
 * Represents output from Claude, including tool calls, thinking, and
 * user-facing text.
 */
export const AssistantLine = z.looseObject({
    type: z.literal("assistant"),
    message: AssistantMessage,
});

// tool_use_result has heterogeneous shapes depending on the tool (Bash, Edit,
// Read, Agent, etc.) with no consistent discriminator field. The field is
// parsed but not used by the event formatter; it is purely informational.
const ToolUseResult = z.union([z.string(), z.looseObject({})]);

/**
 * Represents input to Claude, including tool call results and file contents.
 */
export const UserLine = z.looseObject({
    type: z.literal("user"),
    message: UserMessage,
    tool_use_result: z.optional(ToolUseResult),
});

/**
 * Message types we recognize and have consciously decided not to render, with
 * the reason for each.
 *
 * A type that is neither rendered nor listed here is reported as unrecognized,
 * in red. That is deliberate: it is how we find out that Claude has grown a
 * message type nobody has considered yet. Silence would hide it.
 */
const IGNORED_TYPES = [
    // These events provide incrementally streamed data, which is also rolled
    // up into other event types. We don't care about streaming tokens to
    // output as fast as they come in, so we ignore these events.
    "stream_event",

    // E.g. the "type":"system", "subtype":"init" event. Session bookkeeping
    // rather than anything the agent did.
    "system",

    // I'm not sure what these events are for, but they get emitted every time
    // I run `claude`.
    "rate_limit_event",

    // Result lines seem to just repeat text output earlier by the assistant,
    // so they are redundant.
    "result",

    // A heartbeat from a tool that is still running. It carries no detail
    // beyond how long the call has taken, and one arrives every few seconds
    // during a slow command, so rendering them would be noise.
    "tool_progress",
] as const;

const IgnoredLine = z.looseObject({
    type: z.literal(IGNORED_TYPES),
});

export const StreamJsonLine = z.discriminatedUnion("type", [
    AssistantLine,
    UserLine,
    IgnoredLine,
]);

type IgnoredLine = z.infer<typeof IgnoredLine>;

/**
 * Whether this line is one we recognize and have deliberately decided not to
 * render. `IGNORED_TYPES` is the list, and says why each type is on it.
 */
export function isIgnoredLine(
    line: z.infer<typeof StreamJsonLine>,
): line is IgnoredLine {
    return (IGNORED_TYPES as readonly string[]).includes(line.type);
}
