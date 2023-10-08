import { addressRouter } from "./router/address";
import { customerRouter } from "./router/customer";
import { postRouter } from "./router/post";
import { productRouter } from "./router/product";
import { productCategoryRouter } from "./router/product_category";
import { productTagRouter } from "./router/product_tag";
import { purchaseOrderRouter } from "./router/purchase_order";
import { saleOfferRouter } from "./router/sale_offer";
import { saleOfferNoteRouter } from "./router/sale_offer_note";
import { saleOfferProductRouter } from "./router/sale_offer_product";
import { saleOrderRouter } from "./router/sale_order";
import { supplierRouter } from "./router/supplier";
import { tenantRouter } from "./router/tenant";
import { warehouseRouter } from "./router/warehouse";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  address: addressRouter,
  customer: customerRouter,
  post: postRouter,
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
