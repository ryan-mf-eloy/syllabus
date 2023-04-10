import ConvertBufferToLegibleData from "../../infra/shared/libs/ConvertBufferToLegibleData.js";
import PipelineASync from "../../infra/shared/libs/PipelineAsync.js";
import FileConvert from "../../infra/shared/libs/FileConvert.js";

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

  async import(request, response) {
    try {
      await this.importTaskFromCSVFileService.handle(request);

      response.writeHead(200).end("Tasks imported successfully!");
    } catch (error) {
      response.writeHead(500).end("Error at import your tasks!");
    }
  }

  complete(request, response) {
    const updatedTask = this.updateTaskService.handle({
      completedAt: new Date().getUTCDate(),
    });

    return response.writeHead(200).end(
      JSON.stringify({
        task: updatedTask,
        message: "Delete tasks successfully",
      })
    );
  }

  async create(request, response) {
    console.log(request);
    // const createdTask = this.createTaskService.handle(request.body);

    // console.log(request.body);

    return response.writeHead(200).end(
      JSON.stringify({
        // task: { ...createdTask },
        message: "Create tasks successfully",
      })
    );
  }

  update(request, response) {
    return response.writeHead(200).end("Update tasks successfully");
  }

  delete(request, response) {
    return response.writeHead(200).end("Delete tasks successfully");
  }
}

export default new TaskController(
  new ImportTaskFromCSVFileService(
    new PipelineASync(),
    new TransformStream(new ConvertBufferToLegibleData(), new FileConvert()),
    new WritableStream(
      new ConvertBufferToLegibleData(),
      new CreateTaskService(new CreateTaskRepository(ORM))
    )
  ),
  new CreateTaskService(new CreateTaskRepository(ORM)),
  new UpdateTaskService(new UpdateTaskRepository(ORM)),
  new DeleteTaskService(new DeleteTaskRepository(ORM)),
  new GetTaskService(new GetTaskRepository(ORM))
);
