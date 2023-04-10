export default class GetTaskService {
  constructor(getTaskRepository) {
    this.getTaskRepository = getTaskRepository;
  }

  handle() {
    return this.getTaskRepository.handle();
  }
}
