import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  supplierCreateInput,
  supplierGetInput,
  supplierListInput,
  supplierUpdateInput,
} from "../inputs/supplier";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supplierRouter = createTRPCRouter({
  list: protectedProcedure
    .input(supplierListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.supplier)
        .where(eq(schema.supplier.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.supplier.id));
    }),

  get: protectedProcedure
    .input(supplierGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.supplier)
        .where(eq(schema.supplier.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(supplierCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.supplier).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(supplierUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.supplier)
        .set(rest)
        .where(eq(schema.supplier.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.supplier)
        .where(eq(schema.supplier.id, input));
    }),
});
