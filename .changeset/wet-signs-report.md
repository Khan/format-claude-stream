---
"@khanacademy/format-claude-stream": minor
---

Breaking change: `new ClaudeStreamFormatter` now accepts a context object as the second argument. See the README for a usage example.
If you pass the `cwd` option in the context object, file paths will be relativized in the output.
