export default class UpdateTaskService {
  constructor(updateTaskRepository) {
    this.updateTaskRepository = updateTaskRepository;
  }

  handle(taskId, taskData) {
    return this.updateTaskRepository.handle(taskId, taskData);
  }
}
