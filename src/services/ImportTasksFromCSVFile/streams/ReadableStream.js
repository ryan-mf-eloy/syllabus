import { Readable } from "node:stream";

export default class TransformStream extends Readable {
  handle(buffer) {
    const readableStream = Readable({
      read(chunk, encoding, callback) {
        this.push(buffer);
        this.push(null);
      },
    });

    return readableStream;
  }
}
