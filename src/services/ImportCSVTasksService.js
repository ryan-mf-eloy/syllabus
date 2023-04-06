export default class ImportCSVTasksService {
  constructor(pipelineAsync, readableStream, transformStream, writableStream) {
    this.pipelineAsync = pipelineAsync;
    this.readableStream = readableStream;
    this.transformStream = transformStream;
    this.writableStream = writableStream;
  }

  async handle() {
    await pipelineAsync(
      this.readableStream,
      this.transformStream,
      this.writableStream
    );
  }
}
