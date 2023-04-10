export default class CreateTaskService {
  constructor(createTaskRepository, userEntity) {
    this.createTaskRepository = createTaskRepository;
  }

  handle(taskData) {
    const createdTask = this.createTaskRepository.handle(taskData);

    return createdTask;
  }
}
