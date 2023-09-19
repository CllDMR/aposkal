import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "./_table";
import { product } from "./product";
import { productTag } from "./product_tag";

export const productsToTags = mySqlTable(
  "products_to_product_tags",
  {
    productId: varchar("product_id", { length: 255 }).notNull(),
    product_tagId: varchar("product_tag_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.product_tagId),
  }),
);

export const productsToTagsRelations = relations(productsToTags, ({ one }) => ({
  productTag: one(productTag, {
    fields: [productsToTags.product_tagId],
    references: [productTag.id],
  }),
  product: one(product, {
    fields: [productsToTags.productId],
    references: [product.id],
  }),
}));

export const insertProductsToTagsSchema = createInsertSchema(productsToTags);
export const selectProductsToTagsSchema = createSelectSchema(productsToTags);
