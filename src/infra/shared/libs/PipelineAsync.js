import { pipeline } from "node:stream";
import { promisify } from "node:util";

export default class PipelineAsync {
  pipe(readableStream, transformStream, writableStream) {
    const pipelineASync = promisify(pipeline);

    return pipelineASync(readableStream, transformStream, writableStream);
  }
}
