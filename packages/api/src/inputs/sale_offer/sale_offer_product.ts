import {
  insertSaleOfferProductSchema,
  selectSaleOfferProductSchema,
} from "@acme/db/schema/sale_offer/sale_offer_product";

export const saleOfferProductListInput = selectSaleOfferProductSchema
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
