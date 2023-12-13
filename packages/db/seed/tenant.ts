import { faker } from "@faker-js/faker";

import type { schema } from "../";

export function createRandomTenant({
  addressId,
}: {
  addressId?: string;
}): typeof schema.tenant.$inferInsert {
  return {
    id: faker.string.nanoid(),
    addressId: addressId ?? faker.string.nanoid(),

    email: faker.internet.email(),
    firmPhoneNumber: faker.phone.number(),
    isForeign: faker.datatype.boolean(),
    logoURL: faker.internet.url(),
    mersisNo: faker.number.int({ min: 10 ** 15 - 1, max: 10 ** 16 }).toString(),
    qualifiedPhoneNumber: faker.phone.number(),
    taxNo: faker.number.int({ min: 10 ** 8 - 1, max: 10 ** 9 }).toString(),
    taxOffice: faker.location.city(),
    ticaretSicilNo: faker.number
      .int({ min: 10 ** 15 - 1, max: 10 ** 16 })
      .toString(),
    title: faker.company.name(),
    type: faker.helpers.arrayElement([
      "personal",
      "limited",
      "anonim",
      "other",
    ]),
    web: faker.internet.url(),
  };
}
