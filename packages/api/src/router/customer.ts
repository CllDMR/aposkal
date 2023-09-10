import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  customerCreateInput,
  customerGetInput,
  customerListInput,
  customerUpdateInput,
} from "../inputs/customer";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  list: protectedProcedure
    .input(customerListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.customer)
        .where(eq(schema.customer.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.customer.id));
    }),

  get: protectedProcedure
    .input(customerGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.customer)
        .where(eq(schema.customer.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(customerCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.customer).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(customerUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.customer)
        .set(rest)
        .where(eq(schema.customer.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.customer)
        .where(eq(schema.customer.id, input));
    }),
});
