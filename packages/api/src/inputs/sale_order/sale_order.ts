import { z } from "zod";

import {
  insertSaleOrderSchema,
  selectSaleOrderSchema,
} from "@acme/db/schema/sale_order/sale_order";

export const saleOrderListInput = selectSaleOrderSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    addressId: true,
    companyId: true,
    companyType: true,
    enddate: true,
    priority: true,
    source: true,
    startdate: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const saleOrderGetInput = selectSaleOrderSchema.pick({
  id: true,
});

export const saleOrderCreateInput = insertSaleOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const saleOrderUpdateInput = insertSaleOrderSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    addressId: true,
    companyId: true,
    companyType: true,
    enddate: true,
    priority: true,
    source: true,
    startdate: true,
  });
