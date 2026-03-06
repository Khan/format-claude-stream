import {describe, expect, it} from "@jest/globals";
import {OutputFake} from "./ports/output-fake.ts";
import {BashToolCall} from "./events/bash-tool-call.ts";
import {GenericToolCall} from "./events/generic-tool-call.ts";
import {NullColorizer} from "./ports/null-colorizer.ts";
import {Interpreter} from "./interpreter.ts";

describe("Interpreter", () => {
    it("outputs a generic tool call event", async () => {
        const outputFake = new OutputFake();
        const interpreter = new Interpreter(outputFake, new NullColorizer());

        await interpreter.process(new GenericToolCall("Hammer", {nail: 1}));

        expect(outputFake.value()).toBe(`Hammer: {"nail":1}\n`);
    });

    it("formats a Bash tool call", async () => {
        const outputFake = new OutputFake();
        const interpreter = new Interpreter(outputFake, new NullColorizer());

        await interpreter.process(
            new BashToolCall("pnpm test 2>&1 | tail -100"),
        );

        expect(outputFake.value()).toBe("$ pnpm test 2>&1 | tail -100\n");
    });
});
