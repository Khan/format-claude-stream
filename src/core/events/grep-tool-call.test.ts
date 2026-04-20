import {describe, expect, it} from "vitest";
import {GrepToolCall} from "./grep-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullColorizer = new NullColorizer();
const nullCtx = {colorizer: nullColorizer};

describe("GrepToolCall", () => {
    it("includes the path being searched in the formatted text", () => {
        const event = new GrepToolCall({
            pattern: "a",
            path: "/foo/bar",
            toolUseId: "t1",
        });
        expect(event.format(nullCtx)).toBe("Grep: /a/ in /foo/bar");
    });

    it("defaults the path to '.'", () => {
        const event = new GrepToolCall({pattern: "a", toolUseId: "t1"});
        expect(event.format(nullCtx)).toBe("Grep: /a/ in .");
    });

    it("relativizes path when cwd is provided", () => {
        const event = new GrepToolCall({
            pattern: "a",
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Grep: /a/ in src/foo.ts",
        );
    });

    it("keeps absolute path when path is outside cwd", () => {
        const event = new GrepToolCall({
            pattern: "a",
            path: "/other/file.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Grep: /a/ in /other/file.ts",
        );
    });
});
