export default class CreateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(taskData) {
    this.orm.create("task", taskData);
  }
}
