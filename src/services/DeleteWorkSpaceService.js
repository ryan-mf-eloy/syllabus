export default class DeleteWorkSpaceService {
  constructor(deleteWorkSpaceRepository) {
    this.deleteWorkSpaceRepository = deleteWorkSpaceRepository;
  }

  async handle(workSpaceId) {
    return this.deleteWorkSpaceRepository.handle(workSpaceId);
  }
}
