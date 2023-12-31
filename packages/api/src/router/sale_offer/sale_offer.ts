import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  saleOfferCreateInput,
  saleOfferGetInput,
  saleOfferListInput,
  saleOfferUpdateInput,
} from "../../inputs/sale_offer/sale_offer";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const saleOfferRouter = createTRPCRouter({
  list: protectedProcedure
    .input(saleOfferListInput)
    .query(async ({ ctx, input }) => {
      const saleOffers = await ctx.db.query.saleOffer.findMany({
        where: eq(schema.saleOffer.tenantId, ctx.session.user.ti),
        with: {
          company: true,
          toAddress: true,
        },
        orderBy: desc(schema.saleOffer.id),
        offset: input.offset,
        limit: input.limit,
      });

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.saleOffer)
          .where(eq(schema.saleOffer.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { saleOffers, totalCount };
    }),

  get: protectedProcedure
    .input(saleOfferGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.saleOffer.findFirst({
        where: eq(schema.saleOffer.id, input.id),
        with: {
          company: true,
          toAddress: true,
        },
      });
    }),

  getWithProductsAndNotes: protectedProcedure
    .input(saleOfferGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.saleOffer.findFirst({
        where: eq(schema.saleOffer.id, input.id),
        with: {
          company: true,
          toAddress: true,
          saleOfferNotes: true,
          saleOfferProducts: true,
        },
      });
    }),

  create: protectedProcedure
    .input(saleOfferCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.saleOffer).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(saleOfferUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.saleOffer)
        .set(rest)
        .where(eq(schema.saleOffer.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOffer)
        .where(eq(schema.saleOffer.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOffer)
        .where(inArray(schema.saleOffer.id, input));
    }),
});
