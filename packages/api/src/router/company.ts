import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  companyCreateInput,
  companyGetInput,
  companyListInput,
  companyUpdateInput,
} from "../inputs/company";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  list: protectedProcedure
    .input(companyListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.company)
        .where(eq(schema.company.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.company.id));
    }),

  get: protectedProcedure
    .input(companyGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.company)
        .where(eq(schema.company.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(companyCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.company).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(companyUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.company)
        .set(rest)
        .where(eq(schema.company.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.company)
        .where(eq(schema.company.id, input));
    }),
});