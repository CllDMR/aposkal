import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";
import { saleOffer } from "./sale_offer";

export const saleOfferNote = mySqlTable(
  "sale_offer_note",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    text: varchar("text", { length: 255 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    saleOfferId: varchar("sale_offer_id", { length: 255 }).notNull(),
  },
  ({ tenantId, saleOfferId }) => ({
    tenantIdX: index("tenant_id_index").on(tenantId),
    saleOfferIdX: index("saleOffer_id_index").on(saleOfferId),
  }),
);

export const saleOfferNoteRelations = relations(saleOfferNote, ({ one }) => ({
  tenant: one(tenant, {
    fields: [saleOfferNote.tenantId],
    references: [tenant.id],
  }),
  saleOffer: one(saleOffer, {
    fields: [saleOfferNote.saleOfferId],
    references: [saleOffer.id],
  }),
}));

export const insertSaleOfferNoteSchema = createInsertSchema(saleOfferNote);
export const selectSaleOfferNoteSchema = createSelectSchema(saleOfferNote);
