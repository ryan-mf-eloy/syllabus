export default class CreateTaskRepository {
  constructor(orm) {
    this.orm = orm;
  }

  async handle(taskData) {
    const createdTask = await this.orm.create("task", taskData);
    return createdTask;
  }
}
