export default class CreateUserService {
  constructor(createUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  handle(userData) {
    const createdUser = this.createUserRepository.handle(userData);

    return createdUser;
  }
}
