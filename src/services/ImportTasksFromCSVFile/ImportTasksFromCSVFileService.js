import AppError from "../../server/app/errors/AppError.js";

export default class ImportTasksFromCSVFileService {
  constructor(pipelineAsync, readableStream, transformStream, writableStream) {
    this.pipelineAsync = pipelineAsync;
    this.readableStream = readableStream;
    this.writableStream = writableStream;
    this.transformStream = transformStream;
  }

  async handle({ file, data }) {
    const tenMegaBytes = 1048576 * 10;

    if (file.size > tenMegaBytes)
      throw AppError.handle("File exceed limit size(10MB)", 400);

    if (file.mimetype !== "text/plain")
      throw AppError.handle("Mimetype file not accepted", 400);

    await this.pipelineAsync.pipe(
      this.readableStream.handle(file.buffer),
      this.transformStream.handle(),
      this.writableStream.handle(data)
    );
  }
}
