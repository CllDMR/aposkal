import { z } from "zod";

import {
  insertProductCategorySchema,
  selectProductCategorySchema,
} from "@acme/db/schema/product/product_category";

export const productCategoryListInput = z.object({
  ...selectProductCategorySchema
    .omit({ id: true, authorId: true, tenantId: true })
    .partial({
      createdAt: true,
      updatedAt: true,
      name: true,
      price: true,
    }).shape,
  offset: z.number().default(0),
  limit: z.number().default(10),
});

export const productCategoryGetInput = selectProductCategorySchema.pick({
  id: true,
});

export const productCategoryCreateInput = insertProductCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const productCategoryUpdateInput = insertProductCategorySchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ name: true, price: true });
