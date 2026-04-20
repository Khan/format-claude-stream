import {describe, expect, it} from "vitest";
import {ReadToolCall} from "./read-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullColorizer = new NullColorizer();

describe("ReadToolCall", () => {
    it("formats with absolute path when no cwd provided", () => {
        const event = new ReadToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer})).toBe(
            "Read: /project/src/foo.ts",
        );
    });

    it("relativizes path when cwd is provided", () => {
        const event = new ReadToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Read: src/foo.ts",
        );
    });

    it("keeps absolute path when path is outside cwd", () => {
        const event = new ReadToolCall({path: "/etc/hosts", toolUseId: "t1"});
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Read: /etc/hosts",
        );
    });
});
