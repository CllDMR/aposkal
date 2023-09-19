import { relations, sql } from "drizzle-orm";
import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";
import { productsToSuppliers } from "./productsToSuppliers";

export const product = mySqlTable(
  "product",
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
    price: int("price").notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const productRelations = relations(product, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [product.tenantId],
    references: [tenant.id],
  }),
  productsToSuppliers: many(productsToSuppliers),
}));

export const insertProductSchema = createInsertSchema(product);
export const selectProductSchema = createSelectSchema(product);
