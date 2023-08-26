import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { insertPostSchema, selectPostSchema } from "@acme/db/schema/post";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) =>
    ctx.db.select().from(schema.post).orderBy(desc(schema.post.id)),
  ),

  byId: publicProcedure
    .input(selectPostSchema.pick({ id: true }))
    .query(({ ctx, input }) =>
      ctx.db
        .select()
        .from(schema.post)
        .where(eq(schema.post.id, input.id))
        .then((a) => a[0]),
    ),

  create: protectedProcedure
    .input(insertPostSchema)
    .mutation(({ ctx, input }) => ctx.db.insert(schema.post).values(input)),

  delete: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.delete(schema.post).where(eq(schema.post.id, input)),
    ),
});
