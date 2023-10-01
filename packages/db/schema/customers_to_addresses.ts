import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "./_table";
import { address } from "./address";
import { customer } from "./customer";

export const customersToAddresses = mySqlTable(
  "c_to_a",
  {
    customerId: varchar("customer_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.customerId, t.addressId),
  }),
);

export const customersToAddressesRelations = relations(
  customersToAddresses,
  ({ one }) => ({
    customer: one(customer, {
      fields: [customersToAddresses.customerId],
      references: [customer.id],
    }),
    address: one(address, {
      fields: [customersToAddresses.addressId],
      references: [address.id],
    }),
  }),
);

export const insertCustomersToAddressesSchema =
  createInsertSchema(customersToAddresses);
export const selectCustomersToAddressesSchema =
  createSelectSchema(customersToAddresses);
