import UUID from "../../infra/shared/libs/UUID.js";

import CreateWorkSpaceService from "../../services/CreateWorkSpaceService.js";
import UpdateWorkSpaceService from "../../services/UpdateWorkSpaceService.js";
import DeleteWorkSpaceService from "../../services/DeleteWorkSpaceService.js";
import GetWorkSpaceService from "../../services/GetWorkSpaceService.js";

import ORM from "../../infra/database/orm.js";

import CreateWorkSpaceRepository from "../../infra/database/repositories/workspace/CreateWorkSpaceRepository.js";
import GetWorkSpaceRepository from "../../infra/database/repositories/workspace/GetWorkSpaceRepository.js";
import DeleteWorkSpaceRepository from "../../infra/database/repositories/workspace/DeleteWorkSpaceRepository.js";
import UpdateWorkSpaceRepository from "../../infra/database/repositories/workspace/UpdateWorkSpaceRepository.js";

import WorkSpace from "../../domain/entities/WorkSpace.js";

class WorkSpaceController {
  constructor(
    createWorkSpaceService,
    updateWorkSpaceService,
    deleteWorkSpaceService,
    getWorkSpaceService
  ) {
    this.createWorkSpaceService = createWorkSpaceService;
    this.updateWorkSpaceService = updateWorkSpaceService;
    this.deleteWorkSpaceService = deleteWorkSpaceService;
    this.getWorkSpaceService = getWorkSpaceService;
  }

  async get(request, response) {
    try {
      const workSpaces = await this.getWorkSpaceService.handle();

      return response.writeHead(200).end(
        JSON.stringify({
          workSpaces,
          message: "WorkSpace listed successfully",
        })
      );
    } catch (error) {
      console.error("Error to get workSpaces");
    }
  }

  async create({ body }, response) {
    try {
      const createdWorkSpace = await this.createWorkSpaceService.handle(body);

      return response.writeHead(200).end(
        JSON.stringify({
          workSpace: createdWorkSpace,
          message: "Created workSpace successfully",
        })
      );
    } catch (error) {
      console.error("Error to create workSpace");
    }
  }

  async update({ body, params }, response) {
    try {
      const updatedWorkSpace = await this.updateWorkSpaceService.handle(
        params.id,
        body
      );

      return response.writeHead(200).end(
        JSON.stringify({
          workSpace: updatedWorkSpace,
          message: "Updated workSpace successfully",
        })
      );
    } catch (error) {
      console.error("Error to update workSpace");
    }
  }

  async delete({ params }, response) {
    try {
      await this.deleteWorkSpaceService.handle(params.id);

      return response
        .writeHead(200)
        .end(JSON.stringify({ message: "Deleted workSpace successfully" }));
    } catch (error) {
      console.error("Error to delete workSpace");
    }
  }
}

export default new WorkSpaceController(
  new CreateWorkSpaceService(
    new UUID(),
    new CreateWorkSpaceRepository(ORM),
    new WorkSpace()
  ),
  new UpdateWorkSpaceService(new UpdateWorkSpaceRepository(ORM)),
  new DeleteWorkSpaceService(new DeleteWorkSpaceRepository(ORM)),
  new GetWorkSpaceService(new GetWorkSpaceRepository(ORM))
);
