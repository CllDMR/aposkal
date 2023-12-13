import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSaleOffer({
  tenantId,
  addressId,
  companyId,
}: {
  tenantId?: string;
  addressId?: string;
  companyId?: string;
}): typeof schema.saleOffer.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    addressId: addressId ?? faker.string.nanoid(),
    companyId: companyId ?? faker.string.nanoid(),

    currency: faker.finance.currencyCode(),
    endDate: faker.date.recent({ days: 2, refDate: createdAt }),
    paymentEndDate: faker.date.recent({ days: 3, refDate: createdAt }),
    startDate: faker.date.recent({ days: 4, refDate: createdAt }),
  };
}
