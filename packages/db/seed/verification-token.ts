import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomVerificationToken(): typeof schema.verificationToken.$inferInsert {
  return {
    expires: faker.date.soon({ days: 2 }),
    identifier: faker.string.uuid(),
    token: faker.string.uuid(),
  };
}
