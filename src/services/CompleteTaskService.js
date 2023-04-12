import AppError from "../server/app/errors/AppError.js";

export default class CompleteTaskService {
  constructor(getTaskService, updateTaskRepository) {
    this.getTaskService = getTaskService;
    this.updateTaskRepository = updateTaskRepository;
  }

  async handle(taskId) {
    const tasks = await this.getTaskService.handle();
    const completedTask = tasks.find((task) => task?.id === taskId);

    if (completedTask && completedTask?.completedAt)
      throw AppError.handle("Task already completed", 400);

    return this.updateTaskRepository.handle(taskId, {
      completedAt: new Date(),
    });
  }
}
