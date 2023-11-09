import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "../_table";
import { addressTenant } from "../address/address_tenant";
import { tenant } from "./tenant";

export const tenantsToAddresses = mySqlTable(
  "t_to_a",
  {
    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.tenantId, t.addressId),
  }),
);

export const tenantsToAddressesRelations = relations(
  tenantsToAddresses,
  ({ one }) => ({
    tenant: one(tenant, {
      fields: [tenantsToAddresses.tenantId],
      references: [tenant.id],
    }),
    address: one(addressTenant, {
      fields: [tenantsToAddresses.addressId],
      references: [addressTenant.id],
    }),
  }),
);

export const insertTenantsToAddressesSchema =
  createInsertSchema(tenantsToAddresses);
export const selectTenantsToAddressesSchema =
  createSelectSchema(tenantsToAddresses);
