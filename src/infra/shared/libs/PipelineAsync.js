import { pipeline } from "node:stream";
import { promisify } from "node:util";

export default class PipelineAsync {
  pipelineAsync() {
    return promisify(pipeline);
  }
}
