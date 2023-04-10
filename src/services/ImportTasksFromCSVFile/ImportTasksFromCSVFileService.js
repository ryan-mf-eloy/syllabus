export default class ImportTasksFromCSVFileService {
  constructor(pipelineAsync, transformStream, writableStream) {
    this.pipelineAsync = pipelineAsync;
    this.writableStream = writableStream;
    this.transformStream = transformStream;
  }

  async handle(readableStream) {
    await this.pipelineAsync.pipe(
      readableStream,
      this.transformStream.handle(),
      this.writableStream.handle()
    );
  }
}
