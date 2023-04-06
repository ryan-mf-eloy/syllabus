import { randomUUID } from "node:crypto";

export default class UUIDAdapter {
  gen() {
    return randomUUID();
  }
}
