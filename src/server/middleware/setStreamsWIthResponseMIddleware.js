export default async function setStreamsWIthResponseMIddleware(
  request,
  response
) {
  const responseInBuffer = [];

  for await (const chunk of request) {
    responseInBuffer.push(chunk);
  }

  try {
    const readableResponse = JSON.parse(
      Buffer.concat(responseInBuffer).toString()
    );

    return readableResponse;
  } catch (e) {
    response.writeHead(500).end(`Failed to parse response: ${e.message}`);
  }
}
