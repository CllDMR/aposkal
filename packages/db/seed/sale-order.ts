import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSaleOrder({
  tenantId,
  addressId,
  companyId,
}: {
  tenantId?: string;
  addressId?: string;
  companyId?: string;
}): typeof schema.saleOrder.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    addressId: addressId ?? faker.string.nanoid(),
    companyId: companyId ?? faker.string.nanoid(),

    companyType: faker.helpers.arrayElement([
      "personal",
      "limited",
      "anonim",
      "other",
    ]),
    enddate: faker.date.recent({ days: 3, refDate: createdAt }),
    priority: "",
    source: "",
    startdate: faker.date.recent({ days: 2, refDate: createdAt }),
  };
}
