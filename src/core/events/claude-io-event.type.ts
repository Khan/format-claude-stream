import {Colorizer} from "../ports/colorizer.ts";

export interface ClaudeIOEvent {
    // TODO: make format take a FormattingContext object which has a colorizer.
    // interface FormattingContext {colorizer: Colorizer}
    format(colorizer: Colorizer): string;
}
