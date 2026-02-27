import {Colorizer} from "./colorizer.type.ts";

export class MarkupColorizer implements Colorizer {
    hex(code: string): (text: string) => string {
        return (text) => `[[${code} ${text}]]`;
    }
}
