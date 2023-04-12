export default class DeleteTaskService {
  constructor(deleteTaskRepository) {
    this.deleteTaskRepository = deleteTaskRepository;
  }

  async handle(taskId) {
    return this.deleteTaskRepository.handle(taskId);
  }
}
