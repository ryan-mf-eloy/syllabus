export default class DeleteWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceId) {
    const workSpaces = this.orm.delete("workspace", workSpaceId);

    return workSpaces;
  }
}
