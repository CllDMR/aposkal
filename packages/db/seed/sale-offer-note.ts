import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSaleOfferNote({
  tenantId,
  saleOfferId,
}: {
  tenantId?: string;
  saleOfferId?: string;
}): typeof schema.saleOfferNote.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    saleOfferId: saleOfferId ?? faker.string.nanoid(),

    text: faker.lorem.paragraph().slice(0, 256),
  };
}
