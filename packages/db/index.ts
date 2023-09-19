import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as account from "./schema/auth/account";
import * as session from "./schema/auth/session";
import * as tenant from "./schema/auth/tenant";
import * as user from "./schema/auth/user";
import * as usersToTenants from "./schema/auth/usersToTenants";
import * as verificationToken from "./schema/auth/verificationToken";
import * as customer from "./schema/customer";
import * as post from "./schema/post";
import * as product from "./schema/product";
import * as productCategory from "./schema/product_category";
import * as productTag from "./schema/product_tag";
import * as purchaseOrder from "./schema/purchase_order";
import * as saleOrder from "./schema/sale_order";
import * as supplier from "./schema/supplier";
import * as warehouse from "./schema/warehouse";

export const schema = {
  ...account,
  ...session,
  ...tenant,
  ...user,
  ...usersToTenants,
  ...verificationToken,

  ...customer,
  ...post,
  ...productCategory,
  ...productTag,
  ...product,
  ...purchaseOrder,
  ...saleOrder,
  ...supplier,
  ...warehouse,
};

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
