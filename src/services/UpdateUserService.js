export default class UpdateUserService {
  constructor(updateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  handle(userId, userData) {
    return this.updateUserRepository.handle(userId, userData);
  }
}
