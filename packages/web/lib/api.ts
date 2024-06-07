import { initClient } from "@ts-rest/core";
import { contract } from "@gonwa/share";

export const client = initClient(contract, {
  baseUrl: "http://localhost:3001",
  baseHeaders: {},
});
