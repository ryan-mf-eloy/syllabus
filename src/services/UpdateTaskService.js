export default class UpdateTaskService {
  constructor(updateTaskRepository) {
    this.updateTaskRepository = updateTaskRepository;
  }

  handle(taskId) {
    return this.updateTaskRepository.handle(taskId);
  }
}
