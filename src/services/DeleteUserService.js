export default class DeleteUserService {
  constructor(deleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  handle(userId) {
    return this.deleteUserRepository.handle(userId);
  }
}
