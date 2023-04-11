import { randomUUID } from "node:crypto";

export default class UUID {
  gen() {
    return randomUUID();
  }
}
