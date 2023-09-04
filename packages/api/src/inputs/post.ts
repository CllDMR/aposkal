import { z } from "zod";

import { insertPostSchema, selectPostSchema } from "@acme/db/schema/post";

export const postListInput = selectPostSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
    content: true,
    isDraft: true,
    publishAt: true,
  });

export const postGetInput = selectPostSchema.pick({ id: true });

const datelike = z.union([z.number(), z.string(), z.date()]);

export const postCreateInput = insertPostSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    authorId: true,
    tenantId: true,
    publishAt: true,
  })
  .extend({
    publishAt: datelike.pipe(z.coerce.date()),
  });

export const postUpdateInput = insertPostSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    authorId: true,
    tenantId: true,
  })
  .partial({ title: true, content: true });
