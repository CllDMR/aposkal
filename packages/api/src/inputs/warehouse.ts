import { z } from "zod";

import {
  insertWarehouseSchema,
  selectWarehouseSchema,
} from "@acme/db/schema/warehouse";

export const warehouseListInput = z.object({
  ...selectWarehouseSchema
    .omit({ id: true, authorId: true, tenantId: true })
    .partial({
      createdAt: true,
      updatedAt: true,
      title: true,
    }).shape,
  offset: z.number().default(0),
  limit: z.number().default(10),
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
