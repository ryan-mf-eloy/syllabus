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
import CompleteTaskService from "../../services/CompleteTaskService.js";
import DeleteTaskService from "../../services/DeleteTaskService.js";
import GetTaskService from "../../services/GetTaskService.js";

import ORM from "../../infra/database/orm.js";

import CreateTaskRepository from "../../infra/database/repositories/task/CreateTaskRepository.js";
import GetTaskRepository from "../../infra/database/repositories/task/GetTaskRepository.js";
import DeleteTaskRepository from "../../infra/database/repositories/task/DeleteTaskRepository.js";
import UpdateTaskRepository from "../../infra/database/repositories/task/UpdateTaskRepository.js";

import Task from "../../domain/entities/Task.js";
import AppError from "../app/errors/AppError.js";

class TaskController {
  constructor(
    importTaskFromCSVFileService,
    createTaskService,
    updateTaskService,
    completeTaskService,
    deleteTaskService,
    getTaskService
  ) {
    this.createTaskService = createTaskService;
    this.updateTaskService = updateTaskService;
    this.completeTaskService = completeTaskService;
    this.deleteTaskService = deleteTaskService;
    this.getTaskService = getTaskService;
    this.importTaskFromCSVFileService = importTaskFromCSVFileService;
  }

  async get(request, response) {
    try {
      const tasks = await this.getTaskService.handle();

      return response.writeHead(200).end(
        JSON.stringify({
          tasks,
          message: "Tasks listed successfully",
        })
      );
    } catch (error) {
      console.error("Error to get users");
    }
  }

  async import({ files, body }, response) {
    try {
      await this.importTaskFromCSVFileService.handle({
        file: files,
        data: body,
      });

      return response.writeHead(200).end("Tasks imported successfully!");
    } catch (error) {
      console.error("Error to import tasks");
    }
  }

  async complete({ params }, response) {
    try {
      const completedTask = await this.completeTaskService.handle(params.id);

      return response.writeHead(200).end(
        JSON.stringify({
          task: completedTask,
          message: "Completed tasks successfully",
        })
      );
    } catch (error) {
      console.error("Error to complete task");
    }
  }

  async create({ body }, response) {
    console.log("CREATE");
    try {
      const createdTask = await this.createTaskService.handle(body);

      return response.writeHead(200).end(
        JSON.stringify({
          task: createdTask,
          message: "Created tasks successfully",
        })
      );
    } catch (error) {
      console.error("Error to create task");
    }
  }

  async update({ body, params }, response) {
    try {
      const updatedTask = await this.updateTaskService.handle(params.id, body);

      return response.writeHead(200).end(
        JSON.stringify({
          task: updatedTask,
          message: "Updated tasks successfully",
        })
      );
    } catch (error) {
      console.error("Error to update task");
    }
  }

  async delete({ params }, response) {
    try {
      await this.deleteTaskService.handle(params.id);

      return response
        .writeHead(200)
        .end(JSON.stringify({ message: "Deleted tasks successfully" }));
    } catch (error) {
      console.error("Error to delete task");
    }
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
  new CompleteTaskService(
    new GetTaskService(new GetTaskRepository(ORM)),
    new UpdateTaskRepository(ORM)
  ),
  new DeleteTaskService(new DeleteTaskRepository(ORM)),
  new GetTaskService(new GetTaskRepository(ORM))
);
