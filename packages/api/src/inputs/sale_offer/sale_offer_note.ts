import { z } from "zod";

import {
  insertSaleOfferNoteSchema,
  selectSaleOfferNoteSchema,
} from "@acme/db/schema/sale_offer/sale_offer_note";

export const saleOfferNoteListInput = z.object({
  ...selectSaleOfferNoteSchema
    .omit({ id: true, authorId: true, tenantId: true })
    .partial({
      createdAt: true,
      updatedAt: true,
      saleOfferId: true,
      text: true,
    }).shape,
  offset: z.number().default(0),
  limit: z.number().default(10),
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
  .partial({
    saleOfferId: true,
    text: true,
  });
