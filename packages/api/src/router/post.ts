import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  postAllInput,
  postByIdInput,
  postCreateInput,
  postUpdateInput,
} from "../inputs/post";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: protectedProcedure
    .input(postAllInput)
    .query(({ ctx, input: _ }) =>
      ctx.db
        .select()
        .from(schema.post)
        .where(eq(schema.post.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.post.id)),
    ),

  byId: protectedProcedure.input(postByIdInput).query(({ ctx, input }) =>
    ctx.db
      .select()
      .from(schema.post)
      .where(eq(schema.post.id, input.id))
      .then((a) => a[0]),
  ),

  create: protectedProcedure.input(postCreateInput).mutation(({ ctx, input }) =>
    ctx.db.insert(schema.post).values({
      ...input,
      authorId: ctx.session.user.id,
      tenantId: ctx.session.user.ti,
    }),
  ),

  update: protectedProcedure
    .input(postUpdateInput)
    .mutation(
      ({ ctx, input: { id, ...rest } }) =>
        void ctx.db.update(schema.post).set(rest).where(eq(schema.post.id, id)),
    ),

  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) =>
      ctx.db.delete(schema.post).where(eq(schema.post.id, input)),
    ),
});
