export default class UpdateTaskService {
  constructor(updateTaskRepository) {
    this.updateTaskRepository = updateTaskRepository;
  }

  async handle(taskId, taskData) {
    return this.updateTaskRepository.handle(taskId, {
      ...taskData,
      updatedAt: new Date(),
    });
  }
}
