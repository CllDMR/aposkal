import {
  insertAddressSchema,
  selectAddressSchema,
} from "@acme/db/schema/address";

export const addressListInput = selectAddressSchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    city: true,
    country: true,
    description: true,
    district: true,
    longAddressDescription: true,
    name: true,
    state: true,
    street: true,
  });

export const addressGetInput = selectAddressSchema.pick({ id: true });

export const addressCreateInput = insertAddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const addressUpdateInput = insertAddressSchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    city: true,
    country: true,
    description: true,
    district: true,
    longAddressDescription: true,
    name: true,
    state: true,
    street: true,
  });
