---
"@khanacademy/format-claude-stream": patch
---

Stop reporting tool-progress heartbeats as unrecognized JSON.

Claude emits a `tool_progress` message every few seconds while a long tool call
is in flight. These were not recognized, so each one printed as a red
`Unrecognized JSON: {...}` line in the middle of the agent's output, reading as
an error when it was a sign of life. They are now ignored.
