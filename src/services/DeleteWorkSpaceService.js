export default class DeleteWorkSpaceService {
  constructor(deleteWorkSpaceRepository) {
    this.deleteWorkSpaceRepository = deleteWorkSpaceRepository;
  }

  handle(workSpaceId) {
    return this.deleteWorkSpaceRepository.handle(workSpaceId);
  }
}
