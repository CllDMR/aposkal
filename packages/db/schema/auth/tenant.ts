import { relations } from "drizzle-orm";
import { boolean, index, mysqlEnum, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { address } from "../address";
import { post } from "../post";
import { usersToTenants } from "./usersToTenants";

export const tenant = mySqlTable(
  "tenant",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    type: mysqlEnum("type", [
      "personal",
      "limited",
      "anonim",
      "other",
    ]).notNull(),
    isForeign: boolean("is_foreign").notNull(),
    taxNo: varchar("tax_no", { length: 9 }).notNull(),
    taxOffice: varchar("tax_office", { length: 256 }).notNull(),
    firmPhoneNumber: varchar("firm_phone_number", { length: 256 }).notNull(),
    qualifiedPhoneNumber: varchar("qualified_phone_number", {
      length: 256,
    }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    web: varchar("web", { length: 256 }).notNull(),
    ticaretSicilNo: varchar("ticaretSicilNo", { length: 256 }).notNull(),
    mersisNo: varchar("mersisNo", { length: 256 }).notNull(),

    addressId: varchar("address_id", { length: 255 }).notNull(),
  },
  ({ addressId }) => ({
    addressIdIdx: index("address_id_idx").on(addressId),
  }),
);

export type InsertTenant = typeof tenant.$inferInsert;

export const tenantRelations = relations(tenant, ({ many, one }) => ({
  usersToTenants: many(usersToTenants),
  posts: many(post),
  address: one(address, {
    fields: [tenant.addressId],
    references: [address.id],
  }),
}));

export const insertTenantSchema = createInsertSchema(tenant);
export const selectTenantSchema = createSelectSchema(tenant);
