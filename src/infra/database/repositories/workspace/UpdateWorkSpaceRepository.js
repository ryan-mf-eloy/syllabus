export default class UpdateWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceId, workSpaceData) {
    const updatedWorkSpace = this.orm.update(
      "workspace",
      workSpaceId,
      workSpaceData
    );

    return updatedWorkSpace;
  }
}
