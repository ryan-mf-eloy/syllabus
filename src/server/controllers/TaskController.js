import ImportTaskFromCSVFileService from "../../services/ImportTasksFromCSVFile/ImportTasksFromCSVFileService.js";

import FileConvert from "../../infra/shared/libs/FileConvert.js";
import PipelineASync from "../../infra/shared/libs/PipelineAsync.js";
import ConvertBufferToLegibleData from "../../infra/shared/libs/ConvertBufferToLegibleData.js";

import WritableStream from "../../services/ImportTasksFromCSVFile/streams/WritableStream.js";
import TransformStream from "../../services/ImportTasksFromCSVFile/streams/TransformStream.js";
class TaskController {
  get(request, response) {
    return response.end(
      JSON.stringify([
        {
          tasks: [
            {
              title: "Task 1",
            },
          ],
        },
      ])
    );
  }

  async import(request, response) {
    try {
      await new ImportTaskFromCSVFileService(
        new PipelineASync(),
        request,
        new TransformStream(
          new ConvertBufferToLegibleData(),
          new FileConvert()
        ),
        new WritableStream()
      ).handle();

      response.writeHead(200).end("Tasks imported successfully!");
    } catch (error) {
      console.log(error);
      response.writeHead(500).end("Error at import your tasks!");
    }
  }

  create(request, response) {
    return response.writeHead(200).end("Create tasks successfully");
  }

  update(request, response) {
    return response.writeHead(200).end("Update tasks successfully");
  }

  delete(request, response) {
    return response.writeHead(200).end("Delete tasks successfully");
  }
}

export default new TaskController();
