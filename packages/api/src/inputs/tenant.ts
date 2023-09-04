import { z } from "zod";

import {
  insertTenantSchema,
  selectTenantSchema,
} from "@acme/db/schema/auth/tenant";

export const tenantListInput = selectTenantSchema.omit({ id: true }).partial({
  name: true,
});

export const tenantGetInput = selectTenantSchema.pick({ id: true });

export const tenantCreateInput = insertTenantSchema.omit({
  id: true,
});

export const tenantUpdateInput = insertTenantSchema
  .required()
  .partial({ name: true });

export const tenantAddUserInput = z.object({ email: z.string().email() });
