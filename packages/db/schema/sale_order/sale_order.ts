import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

import { mySqlTable } from "../_table";
import { addressCompany } from "../address/address_company";
import { tenant } from "../auth/tenant";
import { company } from "../company/company";

export const saleOrder = mySqlTable(
  "sale_order",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    priority: varchar("priority", { length: 256 }).notNull(),
    startdate: timestamp("start_date").notNull(),
    enddate: timestamp("end_date").notNull(),
    companyType: varchar("company_type", { length: 256 }).notNull(),
    source: varchar("source", { length: 256 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", { length: 255 }).notNull(),
    companyId: varchar("company_id", { length: 255 }).notNull(),
  },
  ({ tenantId, addressId, companyId }) => ({
    tenantIdX: index("tenant_id_index").on(tenantId),
    addressIdX: index("address_id_index").on(addressId),
    companyIdX: index("company_id_index").on(companyId),
  }),
);

export const saleOrderRelations = relations(saleOrder, ({ one }) => ({
  tenant: one(tenant, {
    fields: [saleOrder.tenantId],
    references: [tenant.id],
  }),
  toAddress: one(addressCompany, {
    fields: [saleOrder.addressId],
    references: [addressCompany.id],
  }),
  company: one(company, {
    fields: [saleOrder.companyId],
    references: [company.id],
  }),
}));

export const insertSaleOrderSchema = createInsertSchema(saleOrder).extend({
  companyId: z.string(),
  addressId: z.string(),
});
export const selectSaleOrderSchema = createSelectSchema(saleOrder);
