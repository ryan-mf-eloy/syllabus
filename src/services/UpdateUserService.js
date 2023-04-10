export default class UpdateUserService {
  constructor(updateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  handle(userId) {
    return this.updateUserRepository.handle(userId);
  }
}
