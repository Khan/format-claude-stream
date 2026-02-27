import {Output} from "./output.ts";

export class OutputFake implements Output {
    private written = "";

    write(data: string): Promise<void> {
        return new Promise((resolve) => {
            setImmediate(() => {
                this.written += data;
                resolve();
            });
        });
    }

    value() {
        return this.written;
    }
}
