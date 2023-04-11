import ConvertBufferToLegibleData from "../../infra/shared/libs/ConvertBufferToLegibleData.js";
import PipelineASync from "../../infra/shared/libs/PipelineAsync.js";
import FileConvert from "../../infra/shared/libs/FileConvert.js";
import UUID from "../../infra/shared/libs/UUID.js";

import ReadableStream from "../../services/ImportTasksFromCSVFile/streams/ReadableStream.js";
import WritableStream from "../../services/ImportTasksFromCSVFile/streams/WritableStream.js";
import TransformStream from "../../services/ImportTasksFromCSVFile/streams/TransformStream.js";

import ImportTaskFromCSVFileService from "../../services/ImportTasksFromCSVFile/ImportTasksFromCSVFileService.js";
import CreateTaskService from "../../services/CreateTaskService.js";
import UpdateTaskService from "../../services/UpdateTaskService.js";
import DeleteTaskService from "../../services/DeleteTaskService.js";
import GetTaskService from "../../services/GetTaskService.js";

import ORM from "../../infra/database/orm.js";

import CreateTaskRepository from "../../infra/database/repositories/task/CreateTaskRepository.js";
import GetTaskRepository from "../../infra/database/repositories/task/GetTaskRepository.js";
import DeleteTaskRepository from "../../infra/database/repositories/task/DeleteTaskRepository.js";
import UpdateTaskRepository from "../../infra/database/repositories/task/UpdateTaskRepository.js";

import Task from "../../domain/entities/Task.js";

class TaskController {
  constructor(
    importTaskFromCSVFileService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
    getTaskService
  ) {
    this.createTaskService = createTaskService;
    this.updateTaskService = updateTaskService;
    this.deleteTaskService = deleteTaskService;
    this.getTaskService = getTaskService;
    this.importTaskFromCSVFileService = importTaskFromCSVFileService;
  }

  get(request, response) {
    const tasks = this.getTaskService.handle();

    return response.writeHead(200).end(
      JSON.stringify({
        tasks,
        message: "Tasks listed successfully",
      })
    );
  }

  async import({ files, body }, response) {
    try {
      await this.importTaskFromCSVFileService.handle({
        file: files,
        data: body,
      });

      return response.writeHead(200).end("Tasks imported successfully!");
    } catch (error) {
      console.log(error);
      return response
        .writeHead(500)
        .end("Error at import your tasks. Verify your .csv file");
    }
  }

  complete(request, response) {
    const updatedTask = this.updateTaskService.handle({
      completedAt: new Date().getUTCDate(),
    });

    return response.writeHead(200).end(
      JSON.stringify({
        task: updatedTask,
        message: "Completed tasks successfully",
      })
    );
  }

  async create({ body }, response) {
    const createdTask = this.createTaskService.handle(body);

    return response.writeHead(200).end(
      JSON.stringify({
        task: createdTask,
        message: "Created tasks successfully",
      })
    );
  }

  update({ body, params }, response) {
    const updatedTask = this.updateTaskService.handle(params.id, body);

    return response.writeHead(200).end(
      JSON.stringify({
        task: updatedTask,
        message: "Updated tasks successfully",
      })
    );
  }

  delete({ params }, response) {
    this.deleteTaskService.handle(params.id);

    return response
      .writeHead(200)
      .end(JSON.stringify({ message: "Deleted tasks successfully" }));
  }
}

export default new TaskController(
  new ImportTaskFromCSVFileService(
    new PipelineASync(),
    new ReadableStream(),
    new TransformStream(new ConvertBufferToLegibleData(), new FileConvert()),
    new WritableStream(
      new ConvertBufferToLegibleData(),
      new CreateTaskService(
        new UUID(),
        new CreateTaskRepository(ORM),
        new Task()
      )
    )
  ),
  new CreateTaskService(new UUID(), new CreateTaskRepository(ORM), new Task()),
  new UpdateTaskService(new UpdateTaskRepository(ORM)),
  new DeleteTaskService(new DeleteTaskRepository(ORM)),
  new GetTaskService(new GetTaskRepository(ORM))
);
