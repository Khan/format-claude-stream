import {describe, expect, it} from "vitest";
import {WriteToolCall} from "./write-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullColorizer = new NullColorizer();

describe("WriteToolCall", () => {
    it("formats with absolute path when no cwd provided", () => {
        const event = new WriteToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer})).toBe(
            "Write: /project/src/foo.ts",
        );
    });

    it("relativizes path when cwd is provided", () => {
        const event = new WriteToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Write: src/foo.ts",
        );
    });

    it("keeps absolute path when path is outside cwd", () => {
        const event = new WriteToolCall({path: "/etc/hosts", toolUseId: "t1"});
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Write: /etc/hosts",
        );
    });
});
