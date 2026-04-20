import {Output} from "./core/ports/output.ts";
import {Colorizer} from "./core/ports/colorizer.ts";
import {Interpreter} from "./core/interpreter.ts";
import {parseEvents} from "./formats/parse-events.ts";

export class ClaudeStreamFormatter {
    interpreter: Interpreter;

    // TODO[1]: Pass a FormattingContext here, not the Colorizer.
    //  Update all documentation since this is a public API.
    constructor(output: Output, colorizer: Colorizer) {
        this.interpreter = new Interpreter(output, colorizer);
    }

    async write(data: unknown): Promise<void> {
        const events = parseEvents(data);
        for (const event of events) {
            await this.interpreter.process(event);
        }
    }
}
