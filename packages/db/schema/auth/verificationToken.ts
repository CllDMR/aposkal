import { primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "../_table";

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

export const insertVerificationTokenSchema =
  createInsertSchema(verificationToken);
export const selectVerificationTokenSchema =
  createSelectSchema(verificationToken);
