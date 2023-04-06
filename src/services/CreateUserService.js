export default class CreateUserService {
  constructor(UUID, createUserRepository, userEntity) {
    this.UUID = UUID;
    this.createUserRepository = createUserRepository;
    this.userEntity = userEntity;
  }

  handle(userData) {
    this.userEntity.set(userData);

    const isValidUserData = this.userEntity.isValid();

    if (isValidUserData === true) {
      const createdUser = this.createUserRepository.handle({
        ...userData,
        id: this.UUID.gen(),
      });

      delete createdUser.password;

      return createdUser;
    } else {
      return {
        error: isValidUserData.message,
      };
    }
  }
}
