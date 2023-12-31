import { z } from "zod";

import {
  insertSaleOfferProductSchema,
  selectSaleOfferProductSchema,
} from "@acme/db/schema/sale_offer/sale_offer_product";

export const saleOfferProductListInput = z.object({
  ...selectSaleOfferProductSchema
    .omit({ id: true, authorId: true, tenantId: true })
    .partial({
      createdAt: true,
      updatedAt: true,
      amount: true,
      currency: true,
      description: true,
      gtipNo: true,
      imageURL: true,
      kdv: true,
      name: true,
      productId: true,
      saleOfferId: true,
      total: true,
      unit: true,
      unitPrice: true,
    }).shape,
  offset: z.number().default(0),
  limit: z.number().default(10),
});

export const saleOfferProductGetInput = selectSaleOfferProductSchema.pick({
  id: true,
});

export const saleOfferProductCreateInput = insertSaleOfferProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const saleOfferProductUpdateInput = insertSaleOfferProductSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    amount: true,
    currency: true,
    description: true,
    gtipNo: true,
    imageURL: true,
    kdv: true,
    name: true,
    productId: true,
    saleOfferId: true,
    total: true,
    unit: true,
    unitPrice: true,
  });
