export default class GetTaskService {
  constructor(getTaskRepository) {
    this.getTaskRepository = getTaskRepository;
  }

  async handle() {
    return this.getTaskRepository.handle();
  }
}
