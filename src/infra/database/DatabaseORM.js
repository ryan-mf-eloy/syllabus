import fs from "node:fs/promises";
import fsDefault from "node:fs";

class DatabaseORM {
  #database = {};
  #databasePath = new URL("db.json", import.meta.url);

  constructor() {
    this.#readDatabaseFile();
  }

  async #readDatabaseFile() {
    try {
      const databaseFileExist = fsDefault.existsSync(this.#databasePath);

      if (databaseFileExist) {
        const data = await fs.readFile(this.#databasePath, "utf8");

        this.#database = JSON.parse(data);
      } else {
        this.#persist();
      }
    } catch (e) {
      console.log(`Error to read database file:${e}`);
    }
  }

  #persist() {
    fs.writeFile(this.#databasePath, JSON.stringify(this.#database));
  }

  getAll(table) {
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

export default new DatabaseORM();
