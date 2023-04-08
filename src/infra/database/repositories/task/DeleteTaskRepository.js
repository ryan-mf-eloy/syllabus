export default class DeleteTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskId) {
    const tasks = this.orm.get("task", taskId);

    return tasks;
  }
}
