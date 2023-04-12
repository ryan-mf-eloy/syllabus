export default class CreateTaskService {
  constructor(UUID, createTaskRepository, taskEntity) {
    this.UUID = UUID;
    this.taskEntity = taskEntity;
    this.createTaskRepository = createTaskRepository;
  }

  async handle(taskData) {
    try {
      this.taskEntity.set({
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...taskData,
        id: this.UUID.gen(),
      });

      const createdTask = await this.createTaskRepository.handle(
        this.taskEntity.get()
      );

      return createdTask;
    } catch (error) {
      console.error(error);
    }
  }
}
