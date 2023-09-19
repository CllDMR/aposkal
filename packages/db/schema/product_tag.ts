import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";
import { productsToTags } from "./products_to_tags";

export const productTag = mySqlTable(
  "product_tag",
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

export const productTagRelations = relations(productTag, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [productTag.tenantId],
    references: [tenant.id],
  }),
  productsToTags: many(productsToTags),
}));

export const insertProductTagSchema = createInsertSchema(productTag);
export const selectProductTagSchema = createSelectSchema(productTag);
