export default class UpdateWorkSpaceService {
  constructor(updateWorkSpaceRepository) {
    this.updateWorkSpaceRepository = updateWorkSpaceRepository;
  }

  async handle(workSpaceId, workSpaceData) {
    return this.updateWorkSpaceRepository.handle(workSpaceId, workSpaceData);
  }
}
