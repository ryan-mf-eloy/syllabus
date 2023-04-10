export default class GetUserService {
  constructor(getUserRepository) {
    this.getUserRepository = getUserRepository;
  }

  handle() {
    return this.getUserRepository.handle();
  }
}
