import { z } from "zod";

import {
  insertProductSchema,
  selectProductSchema,
} from "@acme/db/schema/product/product";

export const productListInput = selectProductSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    name: true,
    unitPrice: true,
    unit: true,
    currency: true,
    kdv: true,
    description: true,
    gtipNo: true,
    imageURL: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const productGetInput = selectProductSchema.pick({ id: true });

export const productCreateInput = insertProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const productUpdateInput = insertProductSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    name: true,
    unitPrice: true,
    unit: true,
    currency: true,
    kdv: true,
    description: true,
    gtipNo: true,
    imageURL: true,
    productCategoryId: true,
    // productTagIds: true,
  });
