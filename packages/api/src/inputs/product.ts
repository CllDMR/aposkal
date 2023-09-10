import {
  insertProductSchema,
  selectProductSchema,
} from "@acme/db/schema/product";

export const productListInput = selectProductSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
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
  .partial({ title: true });
