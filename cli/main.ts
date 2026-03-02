#!/usr/bin/env -S node --import @swc-node/register/esm-register

import readline from "readline";
import {ClaudeStreamFormatter} from "../src/core/claude-stream-formatter.ts";
import {StandardOutput} from "../src/adapters/standard-output.ts";
import {ChalkColorizer} from "../src/adapters/chalk-colorizer.ts";

const pf = new ClaudeStreamFormatter(new StandardOutput(), new ChalkColorizer());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let promiseChain = Promise.resolve()

rl.on('line', (line) => {
    promiseChain = promiseChain.then(async () => {
        try {
            await pf.write(JSON.parse(line));
        } catch (e) {
            console.error(e)
            console.error("The bad line of input was:")
            console.error(line)
            process.exit(1)
        }
    })
});

rl.once('close', () => {

});
