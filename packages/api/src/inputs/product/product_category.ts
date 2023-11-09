import {
  insertProductCategorySchema,
  selectProductCategorySchema,
} from "@acme/db/schema/product/product_category";

export const productCategoryListInput = selectProductCategorySchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    name: true,
    price: true,
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
