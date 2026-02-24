import { Output } from "./output.type.ts";

export class StandardOutput implements Output {
    async write(data: string): Promise<void> {
        process.stdout.write(data);
    }
}
