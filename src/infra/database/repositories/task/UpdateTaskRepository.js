export default class UpdateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  async handle(taskId, taskData) {
    const updatedTask = await this.orm.update("task", taskId, taskData);

    return updatedTask;
  }
}
