import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomAccount(): typeof schema.account.$inferInsert {
  return {
    provider: faker.lorem.word(),
    providerAccountId: faker.string.nanoid(),
    type: "oauth",
    userId: "",
    access_token: "",
    expires_at: 0,
    id_token: "",
    refresh_token: "",
    scope: "",
    session_state: "",
    token_type: "",
  };
}
