import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomProductTag({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.productTag.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    name: faker.commerce.productAdjective(),
  };
}
