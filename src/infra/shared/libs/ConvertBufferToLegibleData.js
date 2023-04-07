export default class ConvertBufferToLegibleData {
  handle(chunk) {
    const dataChunks = [];
    dataChunks.push(chunk);

    const unifiedBuffer = Buffer.concat(dataChunks);
    const legibleData = unifiedBuffer.toString("utf8");

    return legibleData;
  }
}
