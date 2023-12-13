import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomSaleOfferProduct({
  tenantId,
  productId,
  saleOfferId,
}: {
  tenantId?: string;
  productId?: string;
  saleOfferId?: string;
}): typeof schema.saleOfferProduct.$inferInsert {
  const createdAt = faker.date.past();
  return {
    id: faker.string.nanoid(),
    createdAt,
    updatedAt: faker.date.recent({ days: 1, refDate: createdAt }),
    tenantId: tenantId ?? faker.string.nanoid(),
    productId: productId ?? faker.string.nanoid(),
    saleOfferId: saleOfferId ?? faker.string.nanoid(),

    amount: faker.number.float(300),
    currency: faker.finance.currencyCode(),
    gtipNo: faker.number.int({ min: 10 ** 11 - 1, max: 10 ** 12 }).toString(),
    kdv: faker.number.int(30),
    name: faker.commerce.productName(),
    total: faker.number.float(300),
    unit: faker.helpers.arrayElement(["Liter", "Amount"]),
    unitPrice: faker.number.int(100),
    description: faker.commerce.productDescription(),
    imageURL: faker.internet.url(),
  };
}
