import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";

export const purchaseOrder = mySqlTable(
  "purchase_order",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    title: varchar("name", { length: 256 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const purchaseOrderRelations = relations(purchaseOrder, ({ one }) => ({
  tenant: one(tenant, {
    fields: [purchaseOrder.tenantId],
    references: [tenant.id],
  }),
}));

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrder);
export const selectPurchaseOrderSchema = createSelectSchema(purchaseOrder);
