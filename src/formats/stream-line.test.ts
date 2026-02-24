import {describe, it, expect} from "@jest/globals";
import {StreamLine} from "./stream-line.ts";

describe("the StreamLine schema", () => {
    it("rejects an object with an unknown `type`", () => {
        expect(StreamLine.safeParse({type: "weird"})).toEqual(
            expect.objectContaining({success: false}),
        );
    });
});
