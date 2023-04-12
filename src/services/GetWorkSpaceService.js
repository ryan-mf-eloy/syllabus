export default class GetWorkSpaceService {
  constructor(getWorkSpaceRepository) {
    this.getWorkSpaceRepository = getWorkSpaceRepository;
  }

  async handle() {
    return this.getWorkSpaceRepository.handle();
  }
}
