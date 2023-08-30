import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tenantRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
    ctx.db.select().from(schema.tenant).orderBy(desc(schema.tenant.id)),
  ),

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

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ ctx, input }) => ctx.db.insert(schema.tenant).values(input)),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1).optional() }))
    .mutation(
      ({ ctx, input }) =>
        void ctx.db
          .update(schema.tenant)
          .set(input)
          .where(eq(schema.tenant.id, input.id)),
    ),

  delete: publicProcedure
    .input(z.string())
    .mutation(
      ({ ctx, input }) =>
        void ctx.db.delete(schema.tenant).where(eq(schema.tenant.id, input)),
    ),
});
