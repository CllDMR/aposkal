import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  warehouseCreateInput,
  warehouseGetInput,
  warehouseListInput,
  warehouseUpdateInput,
} from "../inputs/warehouse";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const warehouseRouter = createTRPCRouter({
  list: protectedProcedure
    .input(warehouseListInput)
    .query(async ({ ctx, input }) => {
      const warehouses = await ctx.db
        .select()
        .from(schema.warehouse)
        .where(eq(schema.warehouse.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.warehouse.id))
        .offset(input.offset)
        .limit(input.limit);

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.warehouse)
          .where(eq(schema.warehouse.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { warehouses, totalCount };
    }),

  get: protectedProcedure
    .input(warehouseGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.warehouse)
        .where(eq(schema.warehouse.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(warehouseCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.warehouse).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(warehouseUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.warehouse)
        .set(rest)
        .where(eq(schema.warehouse.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.warehouse)
        .where(eq(schema.warehouse.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.warehouse)
        .where(inArray(schema.warehouse.id, input));
    }),
});
