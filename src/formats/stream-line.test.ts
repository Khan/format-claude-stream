import {describe, it, expect} from "@jest/globals";
import {StreamLine} from "./stream-line.ts";

describe("the StreamLine schema", () => {
    it("rejects an object with an unknown `type`", () => {
        expect(StreamLine.safeParse({type: "weird"})).toEqual(
            expect.objectContaining({success: false}),
        );
    });

    it("accepts a thinking message", () => {
        const thinking = {
            type: "assistant",
            message: {
                type: "message",
                content: [{type: "thinking", thinking: "Mmm... donuts"}],
            },
        };
        expect(StreamLine.safeParse(thinking)).toEqual(
            expect.objectContaining({success: true}),
        );
    });
});
