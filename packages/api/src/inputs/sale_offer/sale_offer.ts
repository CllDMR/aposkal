import { z } from "zod";

import {
  insertSaleOfferSchema,
  selectSaleOfferSchema,
} from "@acme/db/schema/sale_offer/sale_offer";

export const saleOfferListInput = selectSaleOfferSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    addressId: true,
    currency: true,
    companyId: true,
    endDate: true,
    no: true,
    paymentEndDate: true,
    startDate: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const saleOfferGetInput = selectSaleOfferSchema.pick({
  id: true,
});

export const saleOfferCreateInput = insertSaleOfferSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const saleOfferUpdateInput = insertSaleOfferSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    addressId: true,
    currency: true,
    companyId: true,
    endDate: true,
    no: true,
    paymentEndDate: true,
    startDate: true,
  });
