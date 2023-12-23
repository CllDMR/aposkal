import { z } from "zod";

import {
  insertCompanySchema,
  selectCompanySchema,
} from "@acme/db/schema/company/company";

import { addressCompanyCreateInput } from "../address/address_company";

export const companyListInput = z.object({
  ...selectCompanySchema
    .omit({ id: true, authorId: true, tenantId: true })
    .partial({
      createdAt: true,
      updatedAt: true,
      email: true,
      firmPhoneNumber: true,
      isForeign: true,
      qualifiedPhoneNumber: true,
      taxNo: true,
      taxOffice: true,
      title: true,
      type: true,
      mersisNo: true,
      ticaretSicilNo: true,
      web: true,
    }).shape,
  offset: z.number().default(0),
  limit: z.number().default(10),
});

export const companyGetInput = selectCompanySchema.pick({ id: true });

export const companyCreateInput = insertCompanySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .merge(
    z.object({
      addresses: z.array(addressCompanyCreateInput.omit({ companyId: true })),
    }),
  );

export const companyUpdateInput = insertCompanySchema
  .required()
  .omit({
    createdAt: true,
    updatedAt: true,
    tenantId: true,
  })
  .partial({
    email: true,
    firmPhoneNumber: true,
    isForeign: true,
    qualifiedPhoneNumber: true,
    taxNo: true,
    taxOffice: true,
    title: true,
    type: true,
    mersisNo: true,
    ticaretSicilNo: true,
    web: true,
  });
