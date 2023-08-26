import { relations, sql } from "drizzle-orm";
import { index, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { tenant, user } from "./auth";

export const post = mySqlTable(
  "post",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    title: varchar("name", { length: 256 }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),

    authorId: varchar("author_id", { length: 255 }).notNull(),
    ownerId: varchar("owner_id", { length: 255 }).notNull(),
  },
  ({ authorId, ownerId }) => ({
    authorIdIdx: index("author_id_idx").on(authorId),
    ownerIdIdx: index("owner_id_idx").on(ownerId),
  }),
);

export const postRelations = relations(post, ({ one }) => ({
  owner: one(tenant),
  author: one(user),
}));
