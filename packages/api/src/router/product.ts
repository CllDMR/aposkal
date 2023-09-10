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
      return await ctx.db
        .select()
        .from(schema.product)
        .where(eq(schema.product.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.product.id));
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
      return await ctx.db.insert(schema.product).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
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
