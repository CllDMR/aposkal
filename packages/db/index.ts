import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as account from "./schema/auth/account";
import * as session from "./schema/auth/session";
import * as tenant from "./schema/auth/tenant";
import * as user from "./schema/auth/user";
import * as usersToTenants from "./schema/auth/usersToTenants";
import * as verificationToken from "./schema/auth/verificationToken";
import * as post from "./schema/post";

export const schema = {
  ...account,
  ...session,
  ...tenant,
  ...user,
  ...usersToTenants,
  ...verificationToken,

  ...post,
};

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
