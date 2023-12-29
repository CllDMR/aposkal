import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

import type { schema } from "../";

export async function createRandomUser(): Promise<
  typeof schema.user.$inferInsert
> {
  const saltRounds = 13;
  const testPassword = "123456";

  return {
    id: faker.string.nanoid(),
    email: faker.internet.email(),
    emailVerified: faker.date.recent(),
    image: faker.internet.avatar(),
    name: faker.internet.displayName(),
    password: await hash(testPassword, saltRounds),
  };
}
