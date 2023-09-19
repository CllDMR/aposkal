import {
  insertProductTagSchema,
  selectProductTagSchema,
} from "@acme/db/schema/product_tag";

export const productTagListInput = selectProductTagSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    name: true,
    price: true,
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
