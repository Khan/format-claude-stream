import {describe, it, expect} from "vitest";
import {GlobToolCall} from "./glob-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullCtx = {colorizer: new NullColorizer()};

describe("GlobToolCall", () => {
    it("includes the path in the formatted output", () => {
        const event = new GlobToolCall({
            path: "/foo",
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(event.format(nullCtx)).toBe("Glob: *.ts in /foo");
    });

    it("omits the path when not provided", () => {
        const event = new GlobToolCall({
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(event.format(nullCtx)).toBe("Glob: *.ts");
    });

    it("omits the path when empty", () => {
        const event = new GlobToolCall({
            pattern: "*.ts",
            path: "",
            toolUseId: "not used",
        });

        expect(event.format(nullCtx)).toBe("Glob: *.ts");
    });

    it("relativizes path when cwd is provided", () => {
        const event = new GlobToolCall({
            path: "/project/src",
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(
            event.format({colorizer: new NullColorizer(), cwd: "/project"}),
        ).toBe("Glob: *.ts in src");
    });

    it("keeps absolute path when path is outside cwd", () => {
        const event = new GlobToolCall({
            path: "/other/dir",
            pattern: "*.ts",
            toolUseId: "not used",
        });

        expect(
            event.format({colorizer: new NullColorizer(), cwd: "/project"}),
        ).toBe("Glob: *.ts in /other/dir");
    });
});
