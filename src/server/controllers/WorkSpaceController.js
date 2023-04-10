import DeleteWorkSpaceRepository from "../../infra/database/repositories/workspace/DeleteWorkSpaceRepository.js";

import ORM from "../../infra/database/orm.js";

class WorkSpaceController {
  get(request, response) {
    return response.end();
  }

  create(request, response) {
    return response.writeHead(200).end("Create workSpace successfully");
  }

  update(request, response) {
    return response.writeHead(200).end("Update workSpace successfully");
  }

  delete(request, response) {
    new DeleteWorkSpaceRepository(ORM).handle("workspace1");
    return response.writeHead(200).end("Delete workSpace successfully");
  }
}

export default new WorkSpaceController();
