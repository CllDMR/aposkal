import { z } from "zod";

import { desc, eq, inArray, schema } from "@acme/db";

import {
  productTagCreateInput,
  productTagGetInput,
  productTagListInput,
  productTagUpdateInput,
} from "../../inputs/product/product_tag";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const productTagRouter = createTRPCRouter({
  list: protectedProcedure
    .input(productTagListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.productTag)
        .where(eq(schema.productTag.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.productTag.id));
    }),

  get: protectedProcedure
    .input(productTagGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.productTag)
        .where(eq(schema.productTag.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(productTagCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.productTag).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(productTagUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.productTag)
        .set(rest)
        .where(eq(schema.productTag.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToTags)
        .where(eq(schema.productsToTags.product_tagId, input));

      return await ctx.db
        .delete(schema.productTag)
        .where(eq(schema.productTag.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToTags)
        .where(inArray(schema.productsToTags.product_tagId, input));

      return await ctx.db
        .delete(schema.productTag)
        .where(inArray(schema.productTag.id, input));
    }),
});
