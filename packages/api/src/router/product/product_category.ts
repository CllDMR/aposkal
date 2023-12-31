import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  productCategoryCreateInput,
  productCategoryGetInput,
  productCategoryListInput,
  productCategoryUpdateInput,
} from "../../inputs/product/product_category";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const productCategoryRouter = createTRPCRouter({
  list: protectedProcedure
    .input(productCategoryListInput)
    .query(async ({ ctx, input }) => {
      const productCategories = await ctx.db
        .select()
        .from(schema.productCategory)
        .where(eq(schema.productCategory.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.productCategory.id))
        .offset(input.offset)
        .limit(input.limit);

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.productCategory)
          .where(eq(schema.productCategory.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { productCategories, totalCount };
    }),

  get: protectedProcedure
    .input(productCategoryGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.productCategory)
        .where(eq(schema.productCategory.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(productCategoryCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.productCategory).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(productCategoryUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.productCategory)
        .set(rest)
        .where(eq(schema.productCategory.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToCategories)
        .where(eq(schema.productsToCategories.product_categoryId, input));

      return await ctx.db
        .delete(schema.productCategory)
        .where(eq(schema.productCategory.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToCategories)
        .where(inArray(schema.productsToCategories.product_categoryId, input));

      return await ctx.db
        .delete(schema.productCategory)
        .where(inArray(schema.productCategory.id, input));
    }),
});
