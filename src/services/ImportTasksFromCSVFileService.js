export default class ImportTasksFromCSVFileService {
  constructor(pipelineAsync, readableStream, transformStream, writableStream) {
    this.pipelineAsync = pipelineAsync;
    this.readableStream = readableStream;
    this.transformStream = transformStream;
    this.writableStream = writableStream;
  }

  async handle() {
    await this.pipelineAsync.pipe(
      this.readableStream,
      this.transformStream.handle(),
      this.writableStream.handle()
    );
  }
}
