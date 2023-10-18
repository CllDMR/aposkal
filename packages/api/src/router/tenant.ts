import { nanoid } from "nanoid";
import { z } from "zod";

import { desc, eq, inArray, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tenantRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
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
        .orderBy(desc(schema.tenant.name))
        .execute();
    }

    return tenants;
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db
        .select()
        .from(schema.tenant)
        .where(eq(schema.tenant.id, input.id))
        .limit(1)
        .then((a) => a[0]),
    ),

  getWithUsers: protectedProcedure.query(({ ctx }) =>
    ctx.db.query.tenant.findFirst({
      with: {
        usersToTenants: {
          with: { user: true },
        },
      },
      where: (tenants, { eq }) => eq(tenants.id, ctx.session.user.ti),
    }),
  ),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const tenantId = nanoid();

      const insertedTenant = await ctx.db
        .insert(schema.tenant)
        .values({ ...input, id: tenantId })
        .execute();

      await ctx.db
        .insert(schema.usersToTenants)
        .values({
          tenantId: tenantId,
          userId: ctx.session.user.id,
        })
        .execute();

      return insertedTenant;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1).optional() }))
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
    .input(z.object({ email: z.string().email() }))
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
});
