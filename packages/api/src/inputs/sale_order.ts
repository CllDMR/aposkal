import {
  insertSaleOrderSchema,
  selectSaleOrderSchema,
} from "@acme/db/schema/sale_order";

export const saleOrderListInput = selectSaleOrderSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    addressId: true,
    customerId: true,
    customerType: true,
    enddate: true,
    priority: true,
    source: true,
    startdate: true,
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
    customerId: true,
    customerType: true,
    enddate: true,
    priority: true,
    source: true,
    startdate: true,
  });
