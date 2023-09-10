import {
  insertWarehouseSchema,
  selectWarehouseSchema,
} from "@acme/db/schema/warehouse";

export const warehouseListInput = selectWarehouseSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
  });

export const warehouseGetInput = selectWarehouseSchema.pick({
  id: true,
});

export const warehouseCreateInput = insertWarehouseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const warehouseUpdateInput = insertWarehouseSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ title: true });
