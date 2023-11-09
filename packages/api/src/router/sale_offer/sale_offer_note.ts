import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  saleOfferNoteCreateInput,
  saleOfferNoteGetInput,
  saleOfferNoteListInput,
  saleOfferNoteUpdateInput,
} from "../../inputs/sale_offer/sale_offer_note";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const saleOfferNoteRouter = createTRPCRouter({
  list: protectedProcedure
    .input(saleOfferNoteListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db.query.saleOfferNote.findMany({
        where: eq(schema.saleOfferNote.tenantId, ctx.session.user.ti),
        orderBy: desc(schema.saleOfferNote.id),
        with: {},
      });
    }),

  get: protectedProcedure
    .input(saleOfferNoteGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.saleOfferNote.findFirst({
        where: eq(schema.saleOfferNote.id, input.id),
        with: {},
      });
    }),

  create: protectedProcedure
    .input(saleOfferNoteCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.saleOfferNote).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(saleOfferNoteUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.saleOfferNote)
        .set(rest)
        .where(eq(schema.saleOfferNote.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOfferNote)
        .where(eq(schema.saleOfferNote.id, input));
    }),
});
