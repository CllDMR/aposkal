import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";

export const productCategory = mySqlTable(
  "product_category",
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

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const productCategoryRelations = relations(
  productCategory,
  ({ one }) => ({
    tenant: one(tenant, {
      fields: [productCategory.tenantId],
      references: [tenant.id],
    }),
  }),
);

export const insertProductCategorySchema = createInsertSchema(productCategory);
export const selectProductCategorySchema = createSelectSchema(productCategory);
