import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomProduct({
  tenantId,
}: {
  tenantId?: string;
}): typeof schema.product.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),

    currency: faker.finance.currencyCode(),
    gtipNo: faker.number.int({ min: 10 ** 11 - 1, max: 10 ** 12 }).toString(),
    kdv: faker.number.int(30),
    name: faker.commerce.productName(),
    unit: faker.helpers.arrayElement(["Liter", "Amount"]),
    unitPrice: faker.number.int(100),
    description: faker.commerce.productDescription(),
    imageURL: faker.internet.url(),
  };
}
