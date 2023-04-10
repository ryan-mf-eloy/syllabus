export default class CreateWorkSpaceService {
  constructor(createWorkSpaceRepository) {
    this.createWorkSpaceRepository = createWorkSpaceRepository;
  }

  handle(workSpaceData) {
    const createdWorkSpace =
      this.createWorkSpaceRepository.handle(workSpaceData);

    return createdWorkSpace;
  }
}
