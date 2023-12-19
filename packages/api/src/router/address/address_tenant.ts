import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  addressTenantCreateInput,
  addressTenantGetInput,
  addressTenantListInput,
  addressTenantUpdateInput,
} from "../../inputs/address/address_tenant";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const addressTenantRouter = createTRPCRouter({
  list: protectedProcedure
    .input(addressTenantListInput)
    .query(async ({ ctx, input }) => {
      const addressTenants = await ctx.db
        .select()
        .from(schema.addressTenant)
        .where(eq(schema.addressTenant.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.addressTenant.id))
        .offset(input.offset)
        .limit(input.limit);

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.addressTenant)
          .where(eq(schema.addressTenant.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { addressTenants, totalCount };
    }),

  get: protectedProcedure
    .input(addressTenantGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(schema.addressTenant)
        .where(eq(schema.addressTenant.id, input.id))
        .limit(1)
        .then((a) => a[0]);
    }),

  create: protectedProcedure
    .input(addressTenantCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.addressTenant).values({
        ...input,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(addressTenantUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db
        .update(schema.addressTenant)
        .set(rest)
        .where(eq(schema.addressTenant.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.addressTenant)
        .where(eq(schema.addressTenant.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.addressTenant)
        .where(inArray(schema.addressTenant.id, input));
    }),
});
