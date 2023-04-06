import http from "node:http";
import { promisify } from "node:util";
import { createWriteStream } from "node:fs";
import { pipeline, Transform, Writable } from "node:stream";

import { csvStringToJson } from "convert-csv-to-json";

const pipelineAsync = promisify(pipeline);

const convertBufferToLegibleData = (chunk) => {
  const dataChunks = [];
  dataChunks.push(chunk);

  const unifiedBuffer = Buffer.concat(dataChunks);
  const legibleData = unifiedBuffer.toString("utf8");

  return legibleData;
};

const server = http.createServer(async (request, response) => {
  const transformData = Transform({
    transform(chunk, encoding, callback) {
      const legibleData = convertBufferToLegibleData(chunk);

      const jsonData = csvStringToJson(legibleData);
      const jsonBuffer = Buffer.from(JSON.stringify(jsonData));

      callback(null, jsonBuffer);
    },
  });

  //   const writableStream = Writable({
  //     write(chunk, encoding, callback) {
  //       console.log("Cadastrou no banco");

  //       callback(null)
  //     },
  //   });

  await pipelineAsync(
    request, // ReadableStream
    transformData,
    createWriteStream("import.json")
  );

  response.writeHead(200).end("CSV import successfully!");
});

server.listen(3000);
