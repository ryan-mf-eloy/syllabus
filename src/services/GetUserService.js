export default class GetUserService {
  constructor(getUserRepository) {
    this.getUserRepository = getUserRepository;
  }

  async handle() {
    return this.getUserRepository.handle();
  }
}
