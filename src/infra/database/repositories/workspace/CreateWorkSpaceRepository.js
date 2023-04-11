export default class CreateWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceData) {
    const createdWorkSpace = this.orm.create("workspace", workSpaceData);
    return createdWorkSpace;
  }
}
