export default class DeleteWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceId) {
    const workSpaces = this.orm.get("workspace", workSpaceId);

    return workSpaces;
  }
}
