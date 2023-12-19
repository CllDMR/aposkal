import { z } from "zod";

import {
  insertProductTagSchema,
  selectProductTagSchema,
} from "@acme/db/schema/product/product_tag";

export const productTagListInput = selectProductTagSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    name: true,
    price: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const productTagGetInput = selectProductTagSchema.pick({
  id: true,
});

export const productTagCreateInput = insertProductTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const productTagUpdateInput = insertProductTagSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ name: true, price: true });
