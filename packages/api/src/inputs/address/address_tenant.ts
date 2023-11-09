import {
  insertAddressTenantSchema,
  selectAddressTenantSchema,
} from "@acme/db/schema/address/address_tenant";

export const addressTenantListInput = selectAddressTenantSchema
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

export const addressTenantGetInput = selectAddressTenantSchema.pick({
  id: true,
});

export const addressTenantCreateInput = insertAddressTenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const addressTenantUpdateInput = insertAddressTenantSchema
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
