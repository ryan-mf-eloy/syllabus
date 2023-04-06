export default class UpdateUserService {
  constructor(updateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }

  handle(userId, userData) {
    const updatedUser = this.updateUserRepository.handle(userId, userData);

    delete updatedUser.password;

    return updatedUser;
  }
}
