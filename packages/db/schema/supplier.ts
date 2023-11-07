import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";
import { productsToSuppliers } from "./product/products_to_suppliers";

export const supplier = mySqlTable(
  "supplier",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    name: varchar("name", { length: 256 }).notNull(),
    address: varchar("address", { length: 256 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const supplierRelations = relations(supplier, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [supplier.tenantId],
    references: [tenant.id],
  }),
  productsToSuppliers: many(productsToSuppliers),
}));

export const insertSupplierSchema = createInsertSchema(supplier).extend({
  productIds: z.object({ id: z.string() }).array(),
});
export const selectSupplierSchema = createSelectSchema(supplier);
