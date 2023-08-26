import { insertPostSchema, selectPostSchema } from "@acme/db/schema/post";

export const postAllInput = selectPostSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
    content: true,
  });

export const postByIdInput = selectPostSchema.pick({ id: true });

export const postCreateInput = insertPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  tenantId: true,
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
