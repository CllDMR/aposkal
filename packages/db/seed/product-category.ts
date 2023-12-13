import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomProductCategory({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.productCategory.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    name: faker.commerce.department(),
  };
}
