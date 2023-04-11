export default class DeleteTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskId) {
    return this.orm.delete("task", taskId);
  }
}
