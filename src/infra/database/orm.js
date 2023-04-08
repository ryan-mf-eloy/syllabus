import ConvertBufferToLegibleData from "../shared/libs/ConvertBufferToLegibleData.js";

import { Transform, Readable } from "node:stream";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
class ORM {
  #database = {};
  #databasePath = new URL("db.json", import.meta.url);

  constructor() {
    this.#databaseConnection();
  }

  async #databaseConnection() {
    try {
      const databaseFileExist = existsSync(this.#databasePath);

      if (databaseFileExist) {
        const convertBufferToLegibleData = new ConvertBufferToLegibleData();

        const readableStream = createReadStream(this.#databasePath);

        const transformStream = Transform({
          transform(chunk, encoding, callback) {
            const legibleData = convertBufferToLegibleData.handle(chunk);
            const jsonData = JSON.parse(legibleData);

            const jsonBuffer = Buffer.from(JSON.stringify(jsonData));

            callback(null, jsonBuffer);
          },
        });

        readableStream.pipe(transformStream).on("data", (chunk) => {
          this.#database = JSON.parse(convertBufferToLegibleData.handle(chunk));
        });
      } else {
        createWriteStream(this.#databasePath);
      }
    } catch (error) {
      console.log(`Database connection error: ${error}`);
    }
  }

  #persist() {
    const database = this.#database;

    Readable({
      read() {
        const databaseBuffer = Buffer.from(JSON.stringify(database));

        this.push(databaseBuffer);
        this.push(null);
      },
    }).pipe(createWriteStream(this.#databasePath));
  }

  get(table) {
    return this.#database[table] ?? [];
  }

  create(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  delete(table, resourceID) {
    if (Array.isArray(this.#database[table])) {
      const tableWithoutDeletedData = this.#database[table].filter(
        (data) => data.id !== resourceID
      );

      this.#database[table] = [...tableWithoutDeletedData];
    } else {
      this.#database[table] = [];
    }

    this.#persist();
    return null;
  }

  update(table, resourceID, newData) {
    if (Array.isArray(this.#database[table])) {
      const data = this.#database[table].find((data) => data.id === resourceID);

      const dataIndex = this.#database[table].findIndex(
        (data) => data.id === resourceID
      );

      const updatedData = { ...data, ...newData };

      this.#database[table][dataIndex] = { ...updatedData };
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    const updatedData = this.#database[table].find(
      (data) => data.id === resourceID
    );
    return updatedData;
  }
}

export default new ORM();
