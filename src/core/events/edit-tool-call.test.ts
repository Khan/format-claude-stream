import {describe, expect, it} from "vitest";
import {EditToolCall} from "./edit-tool-call.ts";
import {NullColorizer} from "../ports/null-colorizer.ts";

const nullColorizer = new NullColorizer();

describe("EditToolCall", () => {
    it("formats with absolute path when no cwd provided", () => {
        const event = new EditToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer})).toBe(
            "Edit: /project/src/foo.ts",
        );
    });

    it("relativizes path when cwd is provided", () => {
        const event = new EditToolCall({
            path: "/project/src/foo.ts",
            toolUseId: "t1",
        });
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Edit: src/foo.ts",
        );
    });

    it("keeps absolute path when path is outside cwd", () => {
        const event = new EditToolCall({path: "/etc/hosts", toolUseId: "t1"});
        expect(event.format({colorizer: nullColorizer, cwd: "/project"})).toBe(
            "Edit: /etc/hosts",
        );
    });
});
