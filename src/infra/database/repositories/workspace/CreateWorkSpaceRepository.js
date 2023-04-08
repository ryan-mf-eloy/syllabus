export default class CreateWorkSpaceRepository {
  constructor(orm) {
    this.orm = orm;
  }

  handle(workSpaceData) {
    this.orm.create("workspace", workSpaceData);
  }
}
