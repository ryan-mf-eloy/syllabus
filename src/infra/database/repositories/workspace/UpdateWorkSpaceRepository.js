export default class UpdateWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceData) {
    const workSpaces = this.orm.update(
      "workspace",
      workSpaceData.id,
      workSpaceData
    );

    return workSpaces;
  }
}
