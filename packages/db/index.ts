import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as address from "./schema/address/address";
import * as account from "./schema/auth/account";
import * as session from "./schema/auth/session";
import * as tenant from "./schema/auth/tenant";
import * as user from "./schema/auth/user";
import * as usersToTenants from "./schema/auth/usersToTenants";
import * as verificationToken from "./schema/auth/verificationToken";
import * as companiesToAddresses from "./schema/company/companies_to_addresses";
import * as company from "./schema/company/company";
import * as post from "./schema/post";
import * as product from "./schema/product/product";
import * as productCategory from "./schema/product/product_category";
import * as productTag from "./schema/product/product_tag";
import * as productsToCategories from "./schema/product/products_to_categories";
import * as productsToSuppliers from "./schema/product/products_to_suppliers";
import * as productsToTags from "./schema/product/products_to_tags";
import * as purchaseOrder from "./schema/purchase_order";
import * as saleOffer from "./schema/sale_offer/sale_offer";
import * as saleOfferNote from "./schema/sale_offer/sale_offer_note";
import * as saleOfferProduct from "./schema/sale_offer/sale_offer_product";
import * as saleOrder from "./schema/sale_order/sale_order";
import * as supplier from "./schema/supplier";
import * as warehouse from "./schema/warehouse";

export const schema = {
  ...account,
  ...session,
  ...tenant,
  ...user,
  ...usersToTenants,
  ...verificationToken,

  ...address,
  ...company,
  ...companiesToAddresses,
  ...post,
  ...product,
  ...productCategory,
  ...productTag,
  ...productsToCategories,
  ...productsToSuppliers,
  ...productsToTags,
  ...purchaseOrder,
  ...saleOffer,
  ...saleOfferProduct,
  ...saleOfferNote,
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
