import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSupplier({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.supplier.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),

    name: faker.company.name(),
    address: faker.helpers.fake(
      "{{location.country}} {{location.city}} {{location.street}} {{location.buildingNumber}}",
    ),
  };
}
