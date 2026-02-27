import {ClaudeIOEvent} from "./events/claude-io-event.type.ts";
import {Colorizer} from "./ports/colorizer.ts";
import {Output} from "./ports/output.ts";

export class Interpreter {
    constructor(
        private readonly output: Output,
        private readonly colorizer: Colorizer,
    ) {}

    process(event: ClaudeIOEvent): Promise<void> {
        return this.output.write(event.format(this.colorizer) + "\n");
    }
}
