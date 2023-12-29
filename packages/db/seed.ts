import { faker } from "@faker-js/faker";
import { Client } from "@planetscale/database";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { schema } from "./";
import { createRandomAccount } from "./seed/account";
import { createRandomAddressCompany } from "./seed/address-company";
import { createRandomAddressTenant } from "./seed/address-tenant";
import { createRandomCompany } from "./seed/company";
import { createRandomProduct } from "./seed/product";
import { createRandomProductCategory } from "./seed/product-category";
import { createRandomProductTag } from "./seed/product-tag";
import { createRandomSaleOffer } from "./seed/sale-offer";
import { createRandomSaleOfferNote } from "./seed/sale-offer-note";
import { createRandomSaleOfferProduct } from "./seed/sale-offer-product";
import { createRandomSaleOrder } from "./seed/sale-order";
import { createRandomSession } from "./seed/session";
import { createRandomSupplier } from "./seed/supplier";
import { createRandomTenant } from "./seed/tenant";
import { createRandomUser } from "./seed/user";
import { createRandomVerificationToken } from "./seed/verification-token";
import { createRandomWarehouse } from "./seed/warehouse";

dotenv.config({ path: "./.env.local" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on ./.env.local");

const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step,
  );

const main = async () => {
  const startTime = performance.now();

  const db = drizzle(
    new Client({
      url: process.env.DATABASE_URL,
    }).connection(),
    { schema },
  );

  console.log("Seed started");

  //#region delete db datas
  console.log("delete db datas - started");

  await db.delete(schema.tenant);
  await db.delete(schema.user);
  await db.delete(schema.account);
  await db.delete(schema.addressCompany);
  await db.delete(schema.addressTenant);
  await db.delete(schema.company);
  await db.delete(schema.productCategory);
  await db.delete(schema.productTag);
  await db.delete(schema.product);
  await db.delete(schema.saleOfferNote);
  await db.delete(schema.saleOfferProduct);
  await db.delete(schema.saleOffer);
  await db.delete(schema.saleOrder);
  await db.delete(schema.session);
  await db.delete(schema.supplier);
  await db.delete(schema.verificationToken);
  await db.delete(schema.warehouse);

  await db.delete(schema.companiesToAddresses);
  await db.delete(schema.productsToCategories);
  await db.delete(schema.productsToSuppliers);
  await db.delete(schema.productsToTags);
  await db.delete(schema.tenantsToAddresses);
  await db.delete(schema.usersToTenants);

  console.log("delete db datas - ended");
  //#endregion

  //#region generate datas
  console.log("generate datas - started");
  const TENANT_COUNT = 5;
  const DATA_SIZE = 95;

  const tenantDatas: (typeof schema.tenant.$inferInsert)[] =
    faker.helpers.multiple(() => createRandomTenant({}), {
      count: TENANT_COUNT,
    });

  const userDatas: (typeof schema.user.$inferInsert)[] = [];
  const accountDatas: (typeof schema.account.$inferInsert)[] = [];
  const addressCompanyDatas: (typeof schema.addressCompany.$inferInsert)[] = [];
  const addressTenantDatas: (typeof schema.addressTenant.$inferInsert)[] = [];
  const companyDatas: (typeof schema.company.$inferInsert)[] = [];
  const productCategoryDatas: (typeof schema.productCategory.$inferInsert)[] =
    [];
  const productTagDatas: (typeof schema.productTag.$inferInsert)[] = [];
  const productDatas: (typeof schema.product.$inferInsert)[] = [];
  const saleOfferNoteDatas: (typeof schema.saleOfferNote.$inferInsert)[] = [];
  const saleOfferProductDatas: (typeof schema.saleOfferProduct.$inferInsert)[] =
    [];
  const saleOfferDatas: (typeof schema.saleOffer.$inferInsert)[] = [];
  const saleOrderDatas: (typeof schema.saleOrder.$inferInsert)[] = [];
  const sessionDatas: (typeof schema.session.$inferInsert)[] = [];
  const supplierDatas: (typeof schema.supplier.$inferInsert)[] = [];
  const verificationTokenDatas: (typeof schema.verificationToken.$inferInsert)[] =
    [];
  const warehouseDatas: (typeof schema.warehouse.$inferInsert)[] = [];

  const companiesToAddressesDatas: (typeof schema.companiesToAddresses.$inferInsert)[] =
    [];
  const productsToCategoriesDatas: (typeof schema.productsToCategories.$inferInsert)[] =
    [];
  const productsToSuppliersDatas: (typeof schema.productsToSuppliers.$inferInsert)[] =
    [];
  const productsToTagsDatas: (typeof schema.productsToTags.$inferInsert)[] = [];
  const tenantsToAddressesDatas: (typeof schema.tenantsToAddresses.$inferInsert)[] =
    [];
  let usersToTenantsDatas: (typeof schema.usersToTenants.$inferInsert)[] = [];

  const saltRounds = 13;
  const testPassword = "123456";

  const testUserData = {
    id: faker.string.nanoid(),
    email: "test-1@example.com",
    emailVerified: faker.date.recent(),
    image: faker.internet.avatar(),
    name: "Test User-1",
    password: await hash(testPassword, saltRounds),
  };

  for (const tenantData of tenantDatas) {
    const _userDatasPromise: Promise<typeof schema.user.$inferInsert>[] =
      faker.helpers.multiple(async () => await createRandomUser(), {
        count: DATA_SIZE,
      });

    const _userDatas = await Promise.all(_userDatasPromise);

    _userDatas.push(testUserData);

    const _accountDatas: (typeof schema.account.$inferInsert)[] =
      faker.helpers.multiple(() => createRandomAccount(), {
        count: DATA_SIZE,
      });

    const _addressCompanyDatas: (typeof schema.addressCompany.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomAddressCompany({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _addressTenantDatas: (typeof schema.addressTenant.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomAddressTenant({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _companyDatas: (typeof schema.company.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomCompany({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _productCategoryDatas: (typeof schema.productCategory.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomProductCategory({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _productTagDatas: (typeof schema.productTag.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomProductTag({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _productDatas: (typeof schema.product.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomProduct({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _saleOfferNoteDatas: (typeof schema.saleOfferNote.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSaleOfferNote({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _saleOfferProductDatas: (typeof schema.saleOfferProduct.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSaleOfferProduct({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _saleOfferDatas: (typeof schema.saleOffer.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSaleOffer({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _saleOrderDatas: (typeof schema.saleOrder.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSaleOrder({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _sessionDatas: (typeof schema.session.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSession({
            userId: faker.helpers.arrayElement(_userDatas).id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _supplierDatas: (typeof schema.supplier.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomSupplier({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _verificationTokenDatas: (typeof schema.verificationToken.$inferInsert)[] =
      faker.helpers.multiple(() => createRandomVerificationToken(), {
        count: DATA_SIZE,
      });

    const _warehouseDatas: (typeof schema.warehouse.$inferInsert)[] =
      faker.helpers.multiple(
        () =>
          createRandomWarehouse({
            tenantId: tenantData.id,
          }),
        {
          count: DATA_SIZE,
        },
      );

    const _companiesToAddressesDatas: (typeof schema.companiesToAddresses.$inferInsert)[] =
      _companyDatas.map((companyData) => ({
        companyId: companyData.id!,
        addressId: faker.helpers.arrayElement(
          _addressCompanyDatas.map(
            (addressCompanyData) => addressCompanyData.id!,
          ),
        ),
      }));

    const _productsToCategoriesDatas: (typeof schema.productsToCategories.$inferInsert)[] =
      _productDatas.map((productData) => ({
        productId: productData.id!,
        product_categoryId: faker.helpers.arrayElement(
          _productCategoryDatas.map(
            (productCategoryData) => productCategoryData.id!,
          ),
        ),
      }));

    const _productsToSuppliersDatas: (typeof schema.productsToSuppliers.$inferInsert)[] =
      _productDatas
        .map((productData) =>
          faker.helpers
            .arrayElements(_supplierDatas, { min: 2, max: 5 })
            .map((supplierData) => ({
              productId: productData.id!,
              supplierId: supplierData.id!,
            })),
        )
        .flat();

    const _productsToTagsDatas: (typeof schema.productsToTags.$inferInsert)[] =
      _productDatas
        .map((productData) =>
          faker.helpers
            .arrayElements(_productTagDatas, { min: 2, max: 5 })
            .map((productTagData) => ({
              productId: productData.id!,
              product_tagId: productTagData.id!,
            })),
        )
        .flat();

    const _tenantsToAddressesDatas: (typeof schema.tenantsToAddresses.$inferInsert)[] =
      _addressTenantDatas.map((addressTenantData) => ({
        tenantId: tenantData.id!,
        addressId: addressTenantData.id!,
      }));

    const _usersToTenantsDatas: (typeof schema.usersToTenants.$inferInsert)[] =
      _userDatas.map((userData) => ({
        tenantId: tenantData.id!,
        userId: userData.id!,
      }));

    userDatas.push(..._userDatas);
    accountDatas.push(..._accountDatas);
    addressCompanyDatas.push(..._addressCompanyDatas);
    addressTenantDatas.push(..._addressTenantDatas);
    companyDatas.push(..._companyDatas);
    productCategoryDatas.push(..._productCategoryDatas);
    productTagDatas.push(..._productTagDatas);
    productDatas.push(..._productDatas);
    saleOfferNoteDatas.push(..._saleOfferNoteDatas);
    saleOfferProductDatas.push(..._saleOfferProductDatas);
    saleOfferDatas.push(..._saleOfferDatas);
    saleOrderDatas.push(..._saleOrderDatas);
    sessionDatas.push(..._sessionDatas);
    supplierDatas.push(..._supplierDatas);
    verificationTokenDatas.push(..._verificationTokenDatas);
    warehouseDatas.push(..._warehouseDatas);

    companiesToAddressesDatas.push(..._companiesToAddressesDatas);
    productsToCategoriesDatas.push(..._productsToCategoriesDatas);
    productsToSuppliersDatas.push(..._productsToSuppliersDatas);
    productsToTagsDatas.push(..._productsToTagsDatas);
    tenantsToAddressesDatas.push(..._tenantsToAddressesDatas);
    usersToTenantsDatas.push(..._usersToTenantsDatas);
  }

  const testUserDataIndexes = userDatas
    .map((elm, idx) => (elm.id === testUserData.id ? idx : ""))
    .filter((i): i is number => typeof i === "number");

  let diffIndex = 0;
  for (const testUserDataIndex of testUserDataIndexes) {
    if (testUserDataIndexes[0] !== testUserDataIndex) {
      userDatas.splice(testUserDataIndex - diffIndex, 1);
      diffIndex++;
    }
  }

  const randomTenantToUser = [...userDatas, ...userDatas, ...userDatas]
    .map((userData) =>
      faker.helpers.arrayElements(tenantDatas).map((tenantData) => ({
        tenantId: tenantData.id!,
        userId: userData.id!,
      })),
    )
    .flat();
  usersToTenantsDatas = [...usersToTenantsDatas, ...randomTenantToUser];
  usersToTenantsDatas = usersToTenantsDatas.slice(0, 10 ** 5 - 1);
  usersToTenantsDatas = [
    ...new Map(
      usersToTenantsDatas.map((usersToTenantsData) => [
        usersToTenantsData.userId + usersToTenantsData.tenantId,
        usersToTenantsData,
      ]),
    ).values(),
  ];

  console.log({
    tenantDatasSize: tenantDatas.length,
    userDatasSize: userDatas.length,
    accountDatasSize: accountDatas.length,
    addressCompanyDatasSize: addressCompanyDatas.length,
    addressTenantDatasSize: addressTenantDatas.length,
    companyDatasSize: companyDatas.length,
    productCategoryDatasSize: productCategoryDatas.length,
    productTagDatasSize: productTagDatas.length,
    productDatasSize: productDatas.length,
    saleOfferNoteDatasSize: saleOfferNoteDatas.length,
    saleOfferProductDatasSize: saleOfferProductDatas.length,
    saleOfferDatasSize: saleOfferDatas.length,
    saleOrderDatasSize: saleOrderDatas.length,
    sessionDatasSize: sessionDatas.length,
    supplierDatasSize: supplierDatas.length,
    verificationTokenDatasSize: verificationTokenDatas.length,
    warehouseDatasSize: warehouseDatas.length,
    companiesToAddressesDatasSize: companiesToAddressesDatas.length,
    productsToCategoriesDatasSize: productsToCategoriesDatas.length,
    productsToSuppliersDatasSize: productsToSuppliersDatas.length,
    productsToTagsDatasSize: productsToTagsDatas.length,
    tenantsToAddressesDatasSize: tenantsToAddressesDatas.length,
    usersToTenantsDatasSize: usersToTenantsDatas.length,
    totalSize:
      tenantDatas.length +
      userDatas.length +
      accountDatas.length +
      addressCompanyDatas.length +
      addressTenantDatas.length +
      companyDatas.length +
      productCategoryDatas.length +
      productTagDatas.length +
      productDatas.length +
      saleOfferNoteDatas.length +
      saleOfferProductDatas.length +
      saleOfferDatas.length +
      saleOrderDatas.length +
      sessionDatas.length +
      supplierDatas.length +
      verificationTokenDatas.length +
      warehouseDatas.length +
      companiesToAddressesDatas.length +
      productsToCategoriesDatas.length +
      productsToSuppliersDatas.length +
      productsToTagsDatas.length +
      tenantsToAddressesDatas.length +
      usersToTenantsDatas.length,
  });

  console.log("generate datas - ended");
  //#endregion

  //#region insert datas
  console.log("insert datas - started");

  await db.insert(schema.account).values(accountDatas);
  await db.insert(schema.addressCompany).values(addressCompanyDatas);
  await db.insert(schema.addressTenant).values(addressTenantDatas);
  await db.insert(schema.company).values(companyDatas);
  await db.insert(schema.productCategory).values(productCategoryDatas);
  await db.insert(schema.productTag).values(productTagDatas);
  await db.insert(schema.product).values(productDatas);
  await db.insert(schema.saleOfferNote).values(saleOfferNoteDatas);
  await db.insert(schema.saleOfferProduct).values(saleOfferProductDatas);
  await db.insert(schema.saleOffer).values(saleOfferDatas);
  await db.insert(schema.saleOrder).values(saleOrderDatas);
  await db.insert(schema.session).values(sessionDatas);
  await db.insert(schema.supplier).values(supplierDatas);
  await db.insert(schema.tenant).values(tenantDatas);
  await db.insert(schema.user).values(userDatas);
  await db.insert(schema.verificationToken).values(verificationTokenDatas);
  await db.insert(schema.warehouse).values(warehouseDatas);

  console.log("insert datas - ended");
  //#endregion

  //#region insert relations of datas
  console.log("insert relations of datas - started");

  await db
    .insert(schema.companiesToAddresses)
    .values(companiesToAddressesDatas);
  await db
    .insert(schema.productsToCategories)
    .values(productsToCategoriesDatas);
  await db.insert(schema.productsToSuppliers).values(productsToSuppliersDatas);
  await db.insert(schema.productsToTags).values(productsToTagsDatas);
  await db.insert(schema.tenantsToAddresses).values(tenantsToAddressesDatas);

  const rangedArray = arrayRange(
    0,
    usersToTenantsDatas.length,
    Math.floor(usersToTenantsDatas.length / 10),
  );

  for (let index = 0; index < rangedArray.length; index++) {
    const sliceIndexStart = rangedArray[index];
    const sliceIndexEnd = rangedArray[index + 1] ?? usersToTenantsDatas.length;

    const elements = usersToTenantsDatas.slice(sliceIndexStart, sliceIndexEnd);

    await db.insert(schema.usersToTenants).values(elements);
  }

  console.log("insert relations of datas - ended");
  //#endregion

  const endTime = performance.now();
  const timeElapsed = endTime - startTime;

  console.log("Seed done, timeElapsed: ", timeElapsed);
};

void main();
