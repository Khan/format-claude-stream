TODO[1]: Add a `cwd` property to FormattingContext that holds the current working directory. In ClaudeIOEvent classes that have a path, relativize the path
in `format()` using the `cwd`.