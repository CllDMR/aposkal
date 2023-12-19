import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";

import {
  saleOfferProductCreateInput,
  saleOfferProductGetInput,
  saleOfferProductListInput,
  saleOfferProductUpdateInput,
} from "../../inputs/sale_offer/sale_offer_product";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const saleOfferProductRouter = createTRPCRouter({
  list: protectedProcedure
    .input(saleOfferProductListInput)
    .query(async ({ ctx, input }) => {
      const saleOfferProducts = await ctx.db.query.saleOfferProduct.findMany({
        where: eq(schema.saleOfferProduct.tenantId, ctx.session.user.ti),
        orderBy: desc(schema.saleOfferProduct.id),
        offset: input.offset,
        limit: input.limit,
      });

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.saleOfferProduct)
          .where(eq(schema.saleOfferProduct.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { saleOfferProducts, totalCount };
    }),

  get: protectedProcedure
    .input(saleOfferProductGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.saleOfferProduct.findFirst({
        where: eq(schema.saleOfferProduct.id, input.id),
        with: {},
      });
    }),

  create: protectedProcedure
    .input(saleOfferProductCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.saleOfferProduct).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(saleOfferProductUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.saleOfferProduct)
        .set(rest)
        .where(eq(schema.saleOfferProduct.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOfferProduct)
        .where(eq(schema.saleOfferProduct.id, input));
    }),
});
