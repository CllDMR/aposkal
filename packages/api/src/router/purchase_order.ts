import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";

import {
  purchaseOrderCreateInput,
  purchaseOrderGetInput,
  purchaseOrderListInput,
  purchaseOrderUpdateInput,
} from "../inputs/purchase_order";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const purchaseOrderRouter = createTRPCRouter({
  list: protectedProcedure
    .input(purchaseOrderListInput)
    .query(async ({ ctx, input }) => {
      const purchaseOrders = await ctx.db
        .select()
        .from(schema.purchaseOrder)
        .where(eq(schema.purchaseOrder.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.purchaseOrder.id))
        .offset(input.offset)
        .limit(input.limit);

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.purchaseOrder)
          .where(eq(schema.purchaseOrder.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { purchaseOrders, totalCount };
    }),

  get: protectedProcedure
    .input(purchaseOrderGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.purchaseOrder)
        .where(eq(schema.purchaseOrder.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(purchaseOrderCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.purchaseOrder).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(purchaseOrderUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.purchaseOrder)
        .set(rest)
        .where(eq(schema.purchaseOrder.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.purchaseOrder)
        .where(eq(schema.purchaseOrder.id, input));
    }),
});
