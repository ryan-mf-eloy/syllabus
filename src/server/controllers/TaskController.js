import ImportTaskFromCSVFileService from "../../services/ImportTasksFromCSVFile/ImportTasksFromCSVFileService.js";

import FileConvert from "../../infra/shared/libs/FileConvert.js";
import PipelineASync from "../../infra/shared/libs/PipelineAsync.js";
import ConvertBufferToLegibleData from "../../infra/shared/libs/ConvertBufferToLegibleData.js";

import WritableStream from "../../services/ImportTasksFromCSVFile/streams/WritableStream.js";
import TransformStream from "../../services/ImportTasksFromCSVFile/streams/TransformStream.js";
class TaskController {
  constructor(
    importTaskFromCSVFileService,
    pipelineAsync,
    transformStream,
    writableStream
  ) {
    this.importTaskFromCSVFileService = importTaskFromCSVFileService;
    this.pipelineAsync = pipelineAsync;
    this.transformStream = transformStream;
    this.writableStream = writableStream;
  }

  get(request, response) {
    return response.end();
  }

  async import(request, response) {
    try {
      await this.importTaskFromCSVFileService(
        request,
        this.pipelineAsync(),
        this.transformStream(),
        this.writableStream()
      ).handle();

      response.writeHead(200).end("Tasks imported successfully!");
    } catch (error) {
      console.log(error);
      response.writeHead(500).end("Error at import your tasks!");
    }
  }

  complete(request, response) {
    return response.writeHead(200).end("Delete tasks successfully");
  }

  async create(request, response) {
    return response.writeHead(200).end("Create tasks successfully");
  }

  update(request, response) {
    return response.writeHead(200).end("Update tasks successfully");
  }

  delete(request, response) {
    return response.writeHead(200).end("Delete tasks successfully");
  }
}

export default new TaskController(
  new ImportTaskFromCSVFileService(),
  new PipelineASync(),
  new TransformStream(new ConvertBufferToLegibleData(), new FileConvert()),
  new WritableStream()
);
