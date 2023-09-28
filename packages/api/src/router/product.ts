import { nanoid } from "nanoid";
import { z } from "zod";

import { and, desc, eq, schema } from "@acme/db";

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
      return await ctx.db.query.product.findFirst({
        where: eq(schema.product.id, input.id),
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
      });
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

      await Promise.all(tagPromises);

      return newProduct;
    }),

  update: protectedProcedure
    .input(productUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { productCategoryId, productTagIds, id, ...rest } = input;

      const product = await ctx.db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, id))
        .limit(1)
        .then((a) => a[0]);

      if (!product) throw new Error("Product not found");

      await ctx.db
        .update(schema.product)
        .set(rest)
        .where(eq(schema.product.id, id));

      //#region Syncronize Relations - productsToTags
      const productsToTags = await ctx.db
        .select()
        .from(schema.productsToTags)
        .where(eq(schema.productsToTags.productId, id));

      const havingProductTagIds = productsToTags.map(
        (productsToTag) => productsToTag.product_tagId,
      );
      const toAddingProductTagIds = productTagIds.filter(
        (el) => !havingProductTagIds.includes(el.id),
      );
      const toRemovingProductTagIds = havingProductTagIds.filter(
        (el) =>
          !productTagIds.map((productTagId) => productTagId.id).includes(el),
      );

      const productTagPromisesToInsert = [];
      const productTagPromisesToDelete = [];

      for (const productTagId of toAddingProductTagIds) {
        productTagPromisesToInsert.push(
          ctx.db
            .insert(schema.productsToTags)
            .values({
              product_tagId: productTagId.id,
              productId: id,
            })
            .execute(),
        );
      }

      for (const productTagId of toRemovingProductTagIds) {
        productTagPromisesToDelete.push(
          ctx.db
            .delete(schema.productsToTags)
            .where(
              and(
                eq(schema.productsToTags.product_tagId, productTagId),
                eq(schema.productsToTags.productId, id),
              ),
            )
            .execute(),
        );
      }

      await Promise.all(productTagPromisesToDelete);
      await Promise.all(productTagPromisesToInsert);
      //#endregion

      //#region Syncronize Relations - productsToCategories
      await ctx.db
        .update(schema.productsToCategories)
        .set({
          product_categoryId: productCategoryId,
        })
        .where(eq(schema.productsToCategories.productId, id));
      //#endregion
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToCategories)
        .where(eq(schema.productsToCategories.productId, input));

      await ctx.db
        .delete(schema.productsToTags)
        .where(eq(schema.productsToTags.productId, input));

      await ctx.db
        .delete(schema.productsToSuppliers)
        .where(eq(schema.productsToSuppliers.productId, input));

      return await ctx.db
        .delete(schema.product)
        .where(eq(schema.product.id, input));
    }),
});
