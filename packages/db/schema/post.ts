import { relations, sql } from "drizzle-orm";
import { boolean, index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant, user } from "./auth";

export const post = mySqlTable(
  "post",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    title: varchar("name", { length: 256 }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    isDraft: boolean("isDraft").notNull().default(false),
    publishAt: timestamp("publish_at").notNull(),

    authorId: varchar("author_id", { length: 255 }).notNull(),
    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ authorId, tenantId }) => ({
    authorIdIdx: index("author_id_idx").on(authorId),
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const postRelations = relations(post, ({ one }) => ({
  tenant: one(tenant, {
    fields: [post.tenantId],
    references: [tenant.id],
  }),
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
}));

export const insertPostSchema = createInsertSchema(post);
export const selectPostSchema = createSelectSchema(post);
