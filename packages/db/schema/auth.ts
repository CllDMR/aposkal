import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { post } from "./post";

export const tenant = mySqlTable("tenant", {
  id: varchar("id", { length: 255 }).$defaultFn(nanoid).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type InsertTenant = typeof tenant.$inferInsert;

export const tenantRelations = relations(tenant, ({ many }) => ({
  usersToTenants: many(usersToTenants),
  posts: many(post),
}));

export const user = mySqlTable("user", {
  id: varchar("id", { length: 255 }).$defaultFn(nanoid).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
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
  posts: many(post),
}));

export const usersToTenants = mySqlTable(
  "users_to_tenants",
  {
    userId: varchar("user_id", { length: 255 }).notNull(),
    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.tenantId),
  }),
);

export const usersToTenantsRelations = relations(usersToTenants, ({ one }) => ({
  tenant: one(tenant, {
    fields: [usersToTenants.tenantId],
    references: [tenant.id],
  }),
  user: one(user, {
    fields: [usersToTenants.userId],
    references: [user.id],
  }),
}));

export const account = mySqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = mySqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const verificationToken = mySqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
