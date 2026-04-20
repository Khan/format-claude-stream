import {describe, it, expect} from "vitest";
import {relativizePath} from "./relativize-path.ts";

describe("relativizePath", () => {
    it("returns relative path when file is under cwd", () => {
        expect(
            relativizePath(
                "/home/user/project",
                "/home/user/project/src/foo.ts",
            ),
        ).toBe("src/foo.ts");
    });

    it("returns '.' when path equals cwd", () => {
        expect(relativizePath("/home/user/project", "/home/user/project")).toBe(
            ".",
        );
    });

    it("returns absolute path when file is outside cwd", () => {
        expect(relativizePath("/home/user/project", "/etc/hosts")).toBe(
            "/etc/hosts",
        );
    });

    it("returns the path unchanged when cwd is undefined", () => {
        expect(relativizePath(undefined, "/home/user/project/src/foo.ts")).toBe(
            "/home/user/project/src/foo.ts",
        );
    });

    it("returns the path unchanged when path is empty string", () => {
        expect(relativizePath("/home/user/project", "")).toBe("");
    });
});
