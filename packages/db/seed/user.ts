import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

import type { schema } from "../";

export async function createRandomUser(): Promise<
  typeof schema.user.$inferInsert
> {
  const saltRounds = 6;
  const testPassword = "123456";

  return {
    id: faker.string.nanoid(),
    // role: "basic",
    email: faker.internet.email(),
    emailVerified: faker.date.recent(),
    image: faker.internet.avatar(),
    name: faker.internet.displayName(),
    password: await hash(testPassword, saltRounds),
  };
}
