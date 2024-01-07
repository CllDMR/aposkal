import { addressCompanyRouter } from "./router/address/address_company";
import { addressTenantRouter } from "./router/address/address_tenant";
import { authRouter } from "./router/auth/auth";
import { companyRouter } from "./router/company/company";
import { productRouter } from "./router/product/product";
import { productCategoryRouter } from "./router/product/product_category";
import { productTagRouter } from "./router/product/product_tag";
import { purchaseOrderRouter } from "./router/purchase_order";
import { saleOfferRouter } from "./router/sale_offer/sale_offer";
import { saleOfferNoteRouter } from "./router/sale_offer/sale_offer_note";
import { saleOfferProductRouter } from "./router/sale_offer/sale_offer_product";
import { saleOrderRouter } from "./router/sale_order/sale_order";
import { supplierRouter } from "./router/supplier";
import { tenantRouter } from "./router/tenant";
import { warehouseRouter } from "./router/warehouse";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  addressCompany: addressCompanyRouter,
  addressTenant: addressTenantRouter,
  company: companyRouter,
  product: productRouter,
  productCategory: productCategoryRouter,
  productTag: productTagRouter,
  purchaseOrder: purchaseOrderRouter,
  saleOffer: saleOfferRouter,
  saleOfferNote: saleOfferNoteRouter,
  saleOfferProduct: saleOfferProductRouter,
  saleOrder: saleOrderRouter,
  supplier: supplierRouter,
  tenant: tenantRouter,
  warehouse: warehouseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
