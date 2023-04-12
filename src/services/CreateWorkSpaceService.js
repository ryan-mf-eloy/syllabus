export default class CreateWorkSpaceService {
  constructor(UUID, createWorkSpaceRepository, workSpaceEntity) {
    this.UUID = UUID;
    this.workSpaceEntity = workSpaceEntity;
    this.createWorkSpaceRepository = createWorkSpaceRepository;
  }

  async handle(workSpaceData) {
    this.workSpaceEntity.set({
      ...workSpaceData,
      id: this.UUID.gen(),
    });

    const createdWorkSpace = await this.createWorkSpaceRepository.handle(
      this.workSpaceEntity.get()
    );

    return createdWorkSpace;
  }
}
