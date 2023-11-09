import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "../_table";
import { addressCompany } from "../address/address_company";
import { company } from "./company";

export const companiesToAddresses = mySqlTable(
  "c_to_a",
  {
    companyId: varchar("company_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.companyId, t.addressId),
  }),
);

export const companiesToAddressesRelations = relations(
  companiesToAddresses,
  ({ one }) => ({
    company: one(company, {
      fields: [companiesToAddresses.companyId],
      references: [company.id],
    }),
    address: one(addressCompany, {
      fields: [companiesToAddresses.addressId],
      references: [addressCompany.id],
    }),
  }),
);

export const insertCompaniesToAddressesSchema =
  createInsertSchema(companiesToAddresses);
export const selectCompaniesToAddressesSchema =
  createSelectSchema(companiesToAddresses);
