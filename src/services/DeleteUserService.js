export default class DeleteUserService {
  constructor(deleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async handle(userId) {
    return this.deleteUserRepository.handle(userId);
  }
}
