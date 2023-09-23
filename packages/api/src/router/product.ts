import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  productCreateInput,
  productGetInput,
  productListInput,
  productUpdateInput,
} from "../inputs/product";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  list: protectedProcedure
    .input(productListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db.query.product.findMany({
        where: eq(schema.product.tenantId, ctx.session.user.ti),
        with: {
          productsToCategories: {
            with: {
              productCategory: true,
            },
          },
          productsToTags: {
            with: {
              productTag: true,
            },
          },
        },
        orderBy: desc(schema.product.id),
      });
    }),

  get: protectedProcedure
    .input(productGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(productCreateInput)
    .mutation(async ({ ctx, input }) => {
      const { productCategoryId, productTagIds, ...rest } = input;

      const productId = nanoid();

      const newProduct = await ctx.db.insert(schema.product).values({
        ...rest,
        id: productId,
        tenantId: ctx.session.user.ti,
      });

      await ctx.db.insert(schema.productsToCategories).values({
        product_categoryId: productCategoryId,
        productId: productId,
      });

      const tagPromises = [];

      for (const productTagId of productTagIds) {
        tagPromises.push(
          ctx.db
            .insert(schema.productsToTags)
            .values({
              product_tagId: productTagId.id,
              productId: productId,
            })
            .execute(),
        );
      }

      console.log(tagPromises);

      await Promise.all(tagPromises);

      return newProduct;
    }),

  update: protectedProcedure
    .input(productUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.product)
        .set(rest)
        .where(eq(schema.product.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.product)
        .where(eq(schema.product.id, input));
    }),
});
