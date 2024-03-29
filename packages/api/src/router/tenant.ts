import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, inArray, schema, sql } from "@acme/db";

import {
  tenantAddUserInput,
  tenantCreateInput,
  tenantGetInput,
  tenantGetWithUsersInput,
  tenantListInput,
  tenantUpdateInput,
} from "../inputs/tenant";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tenantRouter = createTRPCRouter({
  list: publicProcedure
    .input(tenantListInput)
    .query(({ ctx }) =>
      ctx.db.select().from(schema.tenant).orderBy(desc(schema.tenant.id)),
    ),

  listOfUserTenants: protectedProcedure.query(async ({ ctx }) => {
    const usertenants = await ctx.db
      .select()
      .from(schema.usersToTenants)
      .where(eq(schema.usersToTenants.userId, ctx.session.user.id))
      .orderBy(desc(schema.usersToTenants.tenantId));

    let tenants: (typeof schema.tenant.$inferSelect)[] = [];

    if (usertenants.length > 0) {
      tenants = await ctx.db
        .select()
        .from(schema.tenant)
        .where(
          inArray(
            schema.tenant.id,
            usertenants.map((e) => e.tenantId),
          ),
        )
        .orderBy(desc(schema.tenant.title))
        .execute();
    }

    return tenants;
  }),

  get: publicProcedure.input(tenantGetInput).query(({ ctx, input }) =>
    ctx.db
      .select()
      .from(schema.tenant)
      .where(eq(schema.tenant.id, input.id))
      .limit(1)
      .then((a) => a[0]),
  ),

  getWithAddress: protectedProcedure.query(({ ctx }) =>
    ctx.db.query.tenant.findFirst({
      where: eq(schema.tenant.id, ctx.session.user.ti),
      orderBy: desc(schema.tenant.id),
      with: {
        address: true,
      },
    }),
  ),

  getUsersOfTenant: protectedProcedure
    .input(tenantGetWithUsersInput)
    .query(async ({ ctx, input }) => {
      const usersOfTenant = await ctx.db.query.usersToTenants.findMany({
        where: (usersToTenant, { eq }) =>
          eq(usersToTenant.tenantId, ctx.session.user.ti),
        with: { user: true },
        orderBy: desc(schema.usersToTenants.userId),
        offset: input.offset,
        limit: input.limit,
      });

      const { totalCount } = (
        await ctx.db
          .select({
            totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
          })
          .from(schema.usersToTenants)
          .where(eq(schema.usersToTenants.tenantId, ctx.session.user.ti))
      ).at(0) ?? { totalCount: 0 };

      return { users: usersOfTenant.flatMap((e) => e.user), totalCount };
    }),

  create: protectedProcedure
    .input(tenantCreateInput)
    .mutation(async ({ ctx, input: { address, ...restInput } }) => {
      const addressId = nanoid();
      const tenantId = nanoid();

      if (address)
        await ctx.db
          .insert(schema.addressTenant)
          .values({ ...address, tenantId, id: addressId })
          .execute();

      const insertedTenant = await ctx.db
        .insert(schema.tenant)
        .values({
          ...restInput,
          id: tenantId,
          ...(address ? { addressId } : {}),
        })
        .execute();

      await ctx.db
        .insert(schema.usersToTenants)
        .values({
          tenantId: tenantId,
          userId: ctx.session.user.id,
        })
        .execute();

      if (address)
        await ctx.db
          .insert(schema.tenantsToAddresses)
          .values({
            tenantId: tenantId,
            addressId: addressId,
          })
          .execute();

      return insertedTenant;
    }),

  update: protectedProcedure
    .input(tenantUpdateInput)
    .mutation(
      ({ ctx, input }) =>
        void ctx.db
          .update(schema.tenant)
          .set(input)
          .where(eq(schema.tenant.id, input.id)),
    ),

  delete: protectedProcedure
    .input(z.string())
    .mutation(
      ({ ctx, input }) =>
        void ctx.db.delete(schema.tenant).where(eq(schema.tenant.id, input)),
    ),

  addUser: protectedProcedure
    .input(tenantAddUserInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(schema.user)
        .limit(1)
        .where(eq(schema.user.email, input.email))
        .then((a) => a[0]);

      if (!user) throw new Error("Not found user");

      await ctx.db
        .insert(schema.usersToTenants)
        .values({
          tenantId: ctx.session.user.ti,
          userId: user.id,
        })
        .execute();
    }),

  removeUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.usersToTenants)
        .where(eq(schema.usersToTenants.userId, input.userId));
    }),

  removeUserMany: protectedProcedure
    .input(z.string().min(1).array())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.usersToTenants)
        .where(inArray(schema.usersToTenants.userId, input));
    }),
});
