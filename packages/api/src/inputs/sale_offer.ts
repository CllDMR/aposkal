import {
  insertSaleOfferSchema,
  selectSaleOfferSchema,
} from "@acme/db/schema/sale_offer";

export const saleOfferListInput = selectSaleOfferSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    addressId: true,
    currency: true,
    customerId: true,
    endDate: true,
    no: true,
    paymentEndDate: true,
    startDate: true,
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
  .partial({});
