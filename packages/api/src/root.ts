import { customerRouter } from "./router/customer";
import { postRouter } from "./router/post";
import { productRouter } from "./router/product";
import { purchaseOrderRouter } from "./router/purchase_order";
import { saleOrderRouter } from "./router/sale_order";
import { tenantRouter } from "./router/tenant";
import { warehouseRouter } from "./router/warehouse";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  customer: customerRouter,
  post: postRouter,
  product: productRouter,
  purchaseOrder: purchaseOrderRouter,
  saleOrder: saleOrderRouter,
  tenant: tenantRouter,
  warehouse: warehouseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
