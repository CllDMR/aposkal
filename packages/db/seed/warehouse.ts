import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomWarehouse({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.warehouse.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),

    title: faker.helpers.fake(
      "{{location.country}} {{location.city}} {{location.street}} {{location.buildingNumber}}",
    ),
  };
}
