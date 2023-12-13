import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSession({
  userId,
}: {
  userId?: string;
}): typeof schema.session.$inferInsert {
  return {
    userId: userId ?? faker.string.nanoid(),
    expires: faker.date.soon({ days: 2 }),
    sessionToken: faker.string.uuid(),
  };
}
