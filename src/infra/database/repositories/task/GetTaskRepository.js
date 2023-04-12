export default class GetTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  async handle() {
    const tasks = await this.orm.get("task");

    return tasks;
  }
}
