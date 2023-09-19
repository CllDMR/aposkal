import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  productCategoryCreateInput,
  productCategoryGetInput,
  productCategoryListInput,
  productCategoryUpdateInput,
} from "../inputs/product_category";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productCategoryRouter = createTRPCRouter({
  list: protectedProcedure
    .input(productCategoryListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.productCategory)
        .where(eq(schema.productCategory.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.productCategory.id));
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
      return await ctx.db
        .delete(schema.productCategory)
        .where(eq(schema.productCategory.id, input));
    }),
});
