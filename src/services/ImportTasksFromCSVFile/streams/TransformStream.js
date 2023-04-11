import { Transform } from "node:stream";

export default class TransformStream extends Transform {
  constructor(convertBufferToLegibleData, fileConvert) {
    super();
    this.convertBufferToLegibleData = convertBufferToLegibleData;
    this.fileConvert = fileConvert;
  }

  handle() {
    // To don't lose "this" reference into the transform stream function
    const convertBufferToLegibleData = this.convertBufferToLegibleData.handle;
    const convertFromCSVToJson = this.fileConvert.fromCSVToJson;

    const transformStream = Transform({
      transform(chunk, encoding, callback) {
        const legibleData = convertBufferToLegibleData(chunk);
        const jsonData = convertFromCSVToJson(legibleData);

        const jsonBuffer = Buffer.from(JSON.stringify(jsonData));

        callback(null, jsonBuffer);
      },
    });

    return transformStream;
  }
}
