import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import {
  postCreateInput,
  postGetInput,
  postListInput,
  postUpdateInput,
} from "../inputs/post";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  list: protectedProcedure
    .input(postListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db
        .select()
        .from(schema.post)
        .where(eq(schema.post.tenantId, ctx.session.user.ti))
        .orderBy(desc(schema.post.id));
    }),

  get: protectedProcedure.input(postGetInput).query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(schema.post)
      .where(eq(schema.post.id, input.id))
      .limit(1)
      .then((a) => a[0]);
  }),

  create: protectedProcedure
    .input(postCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.post).values({
        ...input,
        authorId: ctx.session.user.id,
        tenantId: ctx.session.user.ti,
      });
    }),

  update: protectedProcedure
    .input(postUpdateInput)
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      await ctx.db.update(schema.post).set(rest).where(eq(schema.post.id, id));
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(schema.post).where(eq(schema.post.id, input));
    }),
});
