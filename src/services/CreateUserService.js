export default class CreateUserService {
  constructor(UUID, createUserRepository, userEntity) {
    this.UUID = UUID;
    this.userEntity = userEntity;
    this.createUserRepository = createUserRepository;
  }

  handle(userData) {
    this.userEntity.set({
      ...userData,
      id: this.UUID.gen(),
    });

    const createdUser = this.createUserRepository.handle(this.userEntity.get());

    return createdUser;
  }
}
