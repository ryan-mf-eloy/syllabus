export default class CreateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskData) {
    const createdTask = this.orm.create("task", taskData);
    return createdTask;
  }
}
