import http from "node:http";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { createReadStream, createWriteStream, writeFileSync } from "node:fs";

const pipelineAsync = promisify(pipeline);

const server = http.createServer(async (request, response) => {
  //   createReadStream(request).pipe(process.stdout);

  request.on("data", (chunk) => {});

  //   await pipelineAsync(
  //     readableStream,
  //     process.stdout
  //     // createWriteStream("import.csv")
  //   );

  response.end("Finish processing!");
});

server.listen(3000);

// let csv = "nome,idade,cpf,renda mensal\n";

// for (let i = 0; i < 1e5; i++) {
//   csv += `Ryan-${i},${Math.random() * 100},${Math.random() * 99999999999},R$${
//     Math.random() * 12000
//   }\n`;
// }

// writeFileSync("big_file.csv", csv);
