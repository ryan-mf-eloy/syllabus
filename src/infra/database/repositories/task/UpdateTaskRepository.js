export default class UpdateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskId, taskData) {
    const updatedTask = this.orm.update("task", taskId, taskData);

    return updatedTask;
  }
}
