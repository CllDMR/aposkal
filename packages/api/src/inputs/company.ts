import {
  insertCompanySchema,
  selectCompanySchema,
} from "@acme/db/schema/company";

export const companyListInput = selectCompanySchema
  .omit({ id: true, authorId: true, tenantId: true })
  .partial({
    createdAt: true,
    updatedAt: true,
    addressId: true,
    email: true,
    firmPhoneNumber: true,
    isForeign: true,
    qualifiedPhoneNumber: true,
    taxNo: true,
    taxOffice: true,
    title: true,
    type: true,
  });

export const companyGetInput = selectCompanySchema.pick({ id: true });

export const companyCreateInput = insertCompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
});

export const companyUpdateInput = insertCompanySchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    addressId: true,
    email: true,
    firmPhoneNumber: true,
    isForeign: true,
    qualifiedPhoneNumber: true,
    taxNo: true,
    taxOffice: true,
    title: true,
    type: true,
  });