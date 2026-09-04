# @khanacademy/format-claude-stream

## 0.2.1

### Patch Changes

- 4e59d85: Stop reporting tool-progress heartbeats as unrecognized JSON.

    Claude emits a `tool_progress` message every few seconds while a long tool call
    is in flight. These were not recognized, so each one printed as a red
    `Unrecognized JSON: {...}` line in the middle of the agent's output, reading as
    an error when it was a sign of life. They are now ignored.

## 0.2.0

### Minor Changes

- caa8120: Breaking change: `new ClaudeStreamFormatter` now accepts a context object as the second argument. See the README for a usage example.
  If you pass the `cwd` option in the context object, file paths will be relativized in the output.

### Patch Changes

- df81848: Agent tool calls are now formatted nicely.
- c3fa49b: `Glob` tool calls are now formatted nicely.
- 05a78f3: `Write` tool calls are now formatted nicely.

## 0.1.4

### Patch Changes

- 8790092: The schema for Bash tool calls has been relaxed so the description is not required. This allows more Bash tool calls to be parsed and formatted nicely.

## 0.1.3

### Patch Changes

- c47684b: Task tool calls are now formatted nicely instead of the raw JSON being dumped.
- 7f1c749: Help text is now printed when the `-h` or `--help` flag is passed on the command line.
- d30a5a4: Task results now render without displaying "Unrecognized JSON" errors.
- cff684c: Subagent prompts no longer display as "Unrecognized JSON" errors.

## 0.1.2

### Patch Changes

- f6d2cec: This release fixes some mistakes in the README.

## 0.1.1

### Patch Changes

- 2fd38f4: Add blank lines between events, for readability. Tool results are kept together with their tool calls, with no intervening blank line. Consecutive Read and Edit calls are also grouped together.

## 0.1.0

### Minor Changes

- 2fa7acc: Previously, Edit tool calls produced output like "The file `<path>` has been updated successfully." This noise is now suppressed.

### Patch Changes

- 305932f: Suppress output of Read calls more reliably, preventing file contents from getting dumped to the terminal.

## 0.0.3

### Patch Changes

- a7ff63b: Compile CLI to JavaScript instead of relying on @swc-node/register to compile it on the fly.

## 0.0.2

### Patch Changes

- ddfdf95: Re-publish of 0.0.1 with package provenance and OIDC enabled

## 0.0.1

### Patch Changes

- 6692ff1: Initial release
