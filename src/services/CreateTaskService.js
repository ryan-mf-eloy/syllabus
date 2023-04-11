export default class CreateTaskService {
  constructor(UUID, createTaskRepository, taskEntity) {
    this.UUID = UUID;
    this.taskEntity = taskEntity;
    this.createTaskRepository = createTaskRepository;
  }

  handle(taskData) {
    this.taskEntity.set({
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...taskData,
      id: this.UUID.gen(),
    });

    const createdTask = this.createTaskRepository.handle(this.taskEntity.get());

    return createdTask;
  }
}
