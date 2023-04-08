export default class UpdateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskData) {
    const tasks = this.orm.get("task", taskData.id, taskData);

    return tasks;
  }
}
