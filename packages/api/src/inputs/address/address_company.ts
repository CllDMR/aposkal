import {
  insertAddressCompanySchema,
  selectAddressCompanySchema,
} from "@acme/db/schema/address/address_company";

export const addressCompanyListInput = selectAddressCompanySchema
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
    companyId: true,
  });

export const addressCompanyGetInput = selectAddressCompanySchema.pick({
  id: true,
});

export const addressCompanyCreateInput = insertAddressCompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const addressCompanyUpdateInput = insertAddressCompanySchema
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
