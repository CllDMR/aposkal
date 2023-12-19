import { z } from "zod";

import {
  insertPurchaseOrderSchema,
  selectPurchaseOrderSchema,
} from "@acme/db/schema/purchase_order";

export const purchaseOrderListInput = selectPurchaseOrderSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const purchaseOrderGetInput = selectPurchaseOrderSchema.pick({
  id: true,
});

export const purchaseOrderCreateInput = insertPurchaseOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const purchaseOrderUpdateInput = insertPurchaseOrderSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ title: true });
