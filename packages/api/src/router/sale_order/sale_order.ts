import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  saleOrderCreateInput,
  saleOrderGetInput,
  saleOrderListInput,
  saleOrderUpdateInput,
} from "../../inputs/sale_order/sale_order";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const saleOrderRouter = createTRPCRouter({
  list: protectedProcedure
    .input(saleOrderListInput)
    .query(async ({ ctx, input }) => {
      const saleOrders = await ctx.db.query.saleOrder.findMany({
        where: eq(schema.saleOrder.tenantId, ctx.session.user.ti),
        with: {
          company: true,
          toAddress: true,
        },
        orderBy: desc(schema.saleOrder.id),
        offset: input.offset,
        limit: input.limit,
      });

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.saleOrder)
          .where(eq(schema.saleOrder.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { saleOrders, totalCount };
    }),

  get: protectedProcedure
    .input(saleOrderGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.saleOrder.findFirst({
        where: eq(schema.saleOrder.id, input.id),
        with: {
          company: true,
          toAddress: true,
        },
      });
    }),

  create: protectedProcedure
    .input(saleOrderCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.saleOrder).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(saleOrderUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.saleOrder)
        .set(rest)
        .where(eq(schema.saleOrder.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOrder)
        .where(eq(schema.saleOrder.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.saleOrder)
        .where(inArray(schema.saleOrder.id, input));
    }),
});
