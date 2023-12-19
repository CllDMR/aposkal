import { z } from "zod";

import {
  insertSupplierSchema,
  selectSupplierSchema,
} from "@acme/db/schema/supplier";

export const supplierListInput = selectSupplierSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    address: true,
    name: true,
  })
  .extend({
    offset: z.number().default(0),
    limit: z.number().default(10),
  });

export const supplierGetInput = selectSupplierSchema.pick({ id: true });

export const supplierCreateInput = insertSupplierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const supplierUpdateInput = insertSupplierSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ address: true, name: true });
