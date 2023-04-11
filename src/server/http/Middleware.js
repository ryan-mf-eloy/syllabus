export default class Middleware {
  setHeaders(response) {
    response.setHeader("Content-Type", "application/json;");
  }
  async setStreamsWithResponseMiddleware(request, response) {
    const responseInBuffer = [];

    for await (const chunk of request) {
      responseInBuffer.push(chunk);
    }

    try {
      const stringData = Buffer.concat(responseInBuffer).toString();
      const contentType = request?.headers["content-type"];
      const isUpload = contentType
        ? contentType.startsWith("multipart/form-data")
        : false;
      const isJson = stringData.startsWith("{");

      if (isJson) {
        return JSON.parse(stringData);
      }

      if (isUpload) {
        return {};
      }

      return stringData;
    } catch (error) {
      response.writeHead(500).end(`Failed to parse response: ${error.message}`);
    }
  }
}
