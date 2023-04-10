export default class DeleteTaskService {
  constructor(deleteTaskRepository) {
    this.deleteTaskRepository = deleteTaskRepository;
  }

  handle(taskId) {
    return this.deleteTaskRepository.handle(taskId);
  }
}
