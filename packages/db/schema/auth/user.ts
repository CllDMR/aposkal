import { relations } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { account } from "./account";
import { session } from "./session";
import { usersToTenants } from "./usersToTenants";

export const user = mySqlTable("user", {
  id: varchar("id", { length: 255 }).$defaultFn(nanoid).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  image: varchar("image", { length: 255 }),
});

export const userRelations = relations(user, ({ many }) => ({
  usersToTenants: many(usersToTenants),
  accounts: many(account),
  sessions: many(session),
}));

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
