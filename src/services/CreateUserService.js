export default class CreateUserService {
  constructor(UUID, createUserRepository, userEntity) {
    this.UUID = UUID;
    this.userEntity = userEntity;
    this.createUserRepository = createUserRepository;
  }

  async handle(userData) {
    this.userEntity.set({
      ...userData,
      id: this.UUID.gen(),
    });

    const createdUser = await this.createUserRepository.handle(
      this.userEntity.get()
    );

    return createdUser;
  }
}
