import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  companyCreateInput,
  companyGetInput,
  companyListInput,
  companyUpdateInput,
} from "../../inputs/company/company";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const companyRouter = createTRPCRouter({
  list: protectedProcedure
    .input(companyListInput)
    .query(async ({ ctx, input }) => {
      const companies = await ctx.db.query.company.findMany({
        where: eq(schema.company.tenantId, ctx.session.user.ti),
        with: {
          companiesToAddresses: {
            with: { address: true },
          },
        },
        orderBy: desc(schema.company.id),
        offset: input.offset,
        limit: input.limit,
      });

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.company)
          .where(eq(schema.company.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { companies, totalCount };
    }),

  get: protectedProcedure
    .input(companyGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.company.findFirst({
        where: eq(schema.company.id, input.id),
        with: {
          companiesToAddresses: {
            with: { address: true },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(companyCreateInput)
    .mutation(async ({ ctx, input: { addresses, ...input } }) => {
      const companyId = nanoid();

      await Promise.all([
        addresses.map(async (address) => {
          const addressId = nanoid();

          await ctx.db.insert(schema.addressCompany).values({
            ...address,
            id: addressId,
            tenantId: ctx.session.user.ti,
            companyId: companyId,
          });

          await ctx.db.insert(schema.companiesToAddresses).values({
            addressId: addressId,
            companyId: companyId,
          });
        }),
      ]);

      return await ctx.db.insert(schema.company).values({
        ...input,
        id: companyId,
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

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.company)
        .where(inArray(schema.company.id, input));
    }),
});
