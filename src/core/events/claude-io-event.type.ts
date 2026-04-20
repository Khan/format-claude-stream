import {Colorizer} from "../ports/colorizer.ts";

export interface FormattingContext {
    colorizer: Colorizer;
}

export interface ClaudeIOEvent {
    format(ctx: FormattingContext): string;
}
