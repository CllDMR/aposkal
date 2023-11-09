import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

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
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db.query.saleOffer.findMany({
        where: eq(schema.saleOffer.tenantId, ctx.session.user.ti),
        orderBy: desc(schema.saleOffer.id),
        with: {
          company: true,
          toAddress: true,
          // saleOfferNotes: true,
          // saleOfferProducts: true,
        },
      });
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

  create: protectedProcedure
    .input(saleOfferCreateInput)
    .mutation(async ({ ctx, input }) => {
      const no = "TEST No";

      return await ctx.db.insert(schema.saleOffer).values({
        ...input,
        tenantId: ctx.session.user.ti,
        no,
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
});
