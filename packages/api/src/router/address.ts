import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  addressCreateInput,
  addressGetInput,
  addressListInput,
  addressUpdateInput,
} from "../inputs/address";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const addressRouter = createTRPCRouter({
  list: protectedProcedure
    .input(addressListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.address)
        .where(eq(schema.address.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.address.id));
    }),

  get: protectedProcedure
    .input(addressGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.address)
        .where(eq(schema.address.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(addressCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.address).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(addressUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.address)
        .set(rest)
        .where(eq(schema.address.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.address)
        .where(eq(schema.address.id, input));
    }),
});
