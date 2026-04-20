import {describe, it, expect} from "vitest";
import {GlobToolCall} from "./glob-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

describe("GlobToolCall", () => {
    it("includes the path in the formatted output", () => {
        const event = new GlobToolCall({
            path: "/foo",
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(event.format(new NullColorizer())).toBe("Glob: *.ts in /foo");
    });

    it("omits the path when not provided", () => {
        const event = new GlobToolCall({
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(event.format(new NullColorizer())).toBe("Glob: *.ts");
    });

    it("omits the path when empty", () => {
        const event = new GlobToolCall({
            pattern: "*.ts",
            path: "",
            toolUseId: "not used",
        });

        expect(event.format(new NullColorizer())).toBe("Glob: *.ts");
    });
});
