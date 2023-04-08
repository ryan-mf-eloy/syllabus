export default class UpdateWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceData) {
    const workSpaces = this.orm.get(
      "workSpace",
      workSpaceData.id,
      workSpaceData
    );

    return workSpaces;
  }
}
