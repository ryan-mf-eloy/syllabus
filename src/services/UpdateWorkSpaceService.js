export default class UpdateWorkSpaceService {
  constructor(updateWorkSpaceRepository) {
    this.updateWorkSpaceRepository = updateWorkSpaceRepository;
  }

  handle(workSpaceId, workSpaceData) {
    return this.updateWorkSpaceRepository.handle(workSpaceId, workSpaceData);
  }
}
