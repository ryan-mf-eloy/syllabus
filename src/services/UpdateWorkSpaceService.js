export default class UpdateWorkSpaceService {
  constructor(updateWorkSpaceRepository) {
    this.updateWorkSpaceRepository = updateWorkSpaceRepository;
  }

  handle(workSpaceId) {
    return this.updateWorkSpaceRepository.handle(workSpaceId);
  }
}
