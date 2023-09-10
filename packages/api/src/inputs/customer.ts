import {
  insertCustomerSchema,
  selectCustomerSchema,
} from "@acme/db/schema/customer";

export const customerListInput = selectCustomerSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    title: true,
  });

export const customerGetInput = selectCustomerSchema.pick({ id: true });

export const customerCreateInput = insertCustomerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const customerUpdateInput = insertCustomerSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({ title: true });
