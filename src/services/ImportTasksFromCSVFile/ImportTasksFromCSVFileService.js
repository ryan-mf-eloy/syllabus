export default class ImportTasksFromCSVFileService {
  constructor(pipelineAsync, readableStream, transformStream, writableStream) {
    this.pipelineAsync = pipelineAsync;
    this.readableStream = readableStream;
    this.writableStream = writableStream;
    this.transformStream = transformStream;
  }

  async handle({ file, data }) {
    await this.pipelineAsync.pipe(
      this.readableStream.handle(file.buffer),
      this.transformStream.handle(),
      this.writableStream.handle(data)
    );
  }
}
