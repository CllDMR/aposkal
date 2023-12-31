import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  addressCompanyCreateInput,
  addressCompanyGetInput,
  addressCompanyListInput,
  addressCompanyUpdateInput,
} from "../../inputs/address/address_company";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const addressCompanyRouter = createTRPCRouter({
  list: protectedProcedure
    .input(addressCompanyListInput)
    .query(async ({ ctx, input }) => {
      const addressCompanies = await ctx.db
        .select()
        .from(schema.addressCompany)
        .where(eq(schema.addressCompany.tenantId, ctx.session.user.ti))
        .where(
          input.companyId
            ? eq(schema.addressCompany.companyId, input.companyId)
            : undefined,
        )
        .orderBy(desc(schema.addressCompany.id))
        .offset(input.offset)
        .limit(input.limit);

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.addressCompany)
          .where(eq(schema.addressCompany.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { addressCompanies, totalCount };
    }),

  get: protectedProcedure
    .input(addressCompanyGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.addressCompany)
        .where(eq(schema.addressCompany.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(addressCompanyCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.addressCompany).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(addressCompanyUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.addressCompany)
        .set(rest)
        .where(eq(schema.addressCompany.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.addressCompany)
        .where(eq(schema.addressCompany.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.addressCompany)
        .where(inArray(schema.addressCompany.id, input));
    }),
});
