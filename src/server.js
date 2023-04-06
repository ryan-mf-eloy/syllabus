import http from "node:http";

const server = http.createServer(async (request, response) => {
  response.writeHead(200).end("API On");
});

server.listen(3000);
