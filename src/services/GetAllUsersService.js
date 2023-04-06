export default class GetAllUsersService {
  constructor(getAllUsersRepository) {
    this.getAllUsersRepository = getAllUsersRepository;
  }

  handle() {
    return this.getAllUsersRepository.handle();
  }
}
