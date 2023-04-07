import ImportTaskFromCSVFileService from "../../services/ImportTasksFromCSVFileService.js";

import FileConvert from "../../infra/shared/libs/FileConvert.js";
import PipelineASync from "../../infra/shared/libs/PipelineAsync.js";
import ConvertBufferToLegibleData from "../../infra/shared/libs/ConvertBufferToLegibleData.js";

import WritableStream from "../../streams/WritableStream.js";
import TransformStream from "../../streams/TransformStream.js";
class TaskController {
  get(request, response) {
    return response.end(
      JSON.stringify([
        {
          tasks: [
            {
              title: "Task 1",
            },
            {
              title: "Task 2",
            },
          ],
        },
      ])
    );
  }

  async create(request, response) {
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
}

export default new TaskController();
