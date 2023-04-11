import { Writable } from "node:stream";

export default class WritableStream extends Writable {
  constructor(convertBufferToLegibleData, createTaskService) {
    super();
    this.convertBufferToLegibleData = convertBufferToLegibleData;
    this.createTaskService = createTaskService;
  }

  handle(data) {
    // To don't lose "this" reference into the transform stream function
    const convertBufferToLegibleData = this.convertBufferToLegibleData.handle;
    const createTaskService = this.createTaskService;

    const writableStream = Writable({
      write(chunk, encoding, callback) {
        const legibleData = convertBufferToLegibleData(chunk);
        const jsonData = JSON.parse(legibleData);

        const taskWithWorkSpaceAndUserId = jsonData.map((taskData) => ({
          ...taskData,
          ...data,
        }));

        createTaskService.handle(taskWithWorkSpaceAndUserId[0]);

        callback(null);
      },
    });

    return writableStream;
  }
}
