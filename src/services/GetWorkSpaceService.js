export default class GetWorkSpaceService {
  constructor(getWorkSpaceRepository) {
    this.getWorkSpaceRepository = getWorkSpaceRepository;
  }

  handle() {
    return this.getWorkSpaceRepository.handle();
  }
}
