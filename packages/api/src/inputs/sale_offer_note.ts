import {
  insertSaleOfferNoteSchema,
  selectSaleOfferNoteSchema,
} from "@acme/db/schema/sale_offer_note";

export const saleOfferNoteListInput = selectSaleOfferNoteSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
  });

export const saleOfferNoteGetInput = selectSaleOfferNoteSchema.pick({
  id: true,
});

export const saleOfferNoteCreateInput = insertSaleOfferNoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const saleOfferNoteUpdateInput = insertSaleOfferNoteSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({});