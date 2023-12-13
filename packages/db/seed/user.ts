import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomUser(): typeof schema.user.$inferInsert {
  return {
    id: faker.string.nanoid(),
    email: faker.internet.email(),
    emailVerified: faker.date.recent(),
    image: faker.internet.avatar(),
    name: faker.internet.displayName(),
  };
}
