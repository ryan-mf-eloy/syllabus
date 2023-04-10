export default class UpdateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskData) {
    const tasks = this.orm.update("task", taskData.id, taskData);

    return tasks;
  }
}
