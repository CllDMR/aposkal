import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomAddressTenant({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.addressTenant.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),

    city: faker.location.city(),
    country: faker.location.country(),
    description: faker.location.city(),
    district: faker.location.street(),
    name: faker.lorem.words(),
    street: faker.location.street(),
    longAddressDescription: faker.lorem.sentence(),
    state: faker.location.state(),
  };
}
