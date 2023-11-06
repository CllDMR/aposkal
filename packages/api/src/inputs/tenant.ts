import { z } from "zod";

import {
  insertTenantSchema,
  selectTenantSchema,
} from "@acme/db/schema/auth/tenant";

export const tenantListInput = selectTenantSchema.omit({ id: true }).partial({
  addressId: true,
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

export const tenantGetInput = selectTenantSchema.pick({ id: true });

export const tenantCreateInput = insertTenantSchema.omit({
  id: true,
});

export const tenantUpdateInput = insertTenantSchema.required().partial({
  addressId: true,
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

export const tenantAddUserInput = z.object({ email: z.string().email() });
