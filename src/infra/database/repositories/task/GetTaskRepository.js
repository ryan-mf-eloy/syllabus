export default class GetTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle() {
    const tasks = this.orm.get("task");

    return tasks;
  }
}
