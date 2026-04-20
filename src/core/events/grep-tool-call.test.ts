import {describe, expect, it} from "vitest";
import {GrepToolCall} from "./grep-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullColorizer = new NullColorizer();

describe("GrepToolCall", () => {
    it("includes the path being searched in the formatted text", () => {
        const event = new GrepToolCall({
            pattern: "a",
            path: "/foo/bar",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer})).toBe(
            "Grep: /a/ in /foo/bar",
        );
    });

    it("defaults the path to '.'", () => {
        const event = new GrepToolCall({pattern: "a", toolUseId: "t1"});
        expect(event.format({colorizer: nullColorizer})).toBe("Grep: /a/ in .");
    });
});
