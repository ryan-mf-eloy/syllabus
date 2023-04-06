import { Transform, Writable } from "node:stream";

import { csvStringToJson } from "convert-csv-to-json";

export default class TransformStream extends Writable {
  handle() {
    const transformStream = Transform({
      transform(chunk, encoding, callback) {
        const legibleData = convertBufferToLegibleData(chunk);

        const jsonData = csvStringToJson(legibleData);
        const jsonBuffer = Buffer.from(JSON.stringify(jsonData));

        callback(null, jsonBuffer);
      },
    });

    return transformStream;
  }
}
