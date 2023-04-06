import { Writable } from "node:stream";

export default class WritableStream extends Writable {
  handle() {
    const writableStream = Writable({
      write(chunk, encoding, callback) {
        console.log("Stored tasks on database");

        callback(null);
      },
    });

    return writableStream;
  }
}
