import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { AddressTenantTable } from "~/components/organisms/address-tenant/AddressTenantTable";

export default async function AddressCompaniesPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const addresses = await db
    .select()
    .from(schema.addressTenant)
    .where(eq(schema.addressTenant.tenantId, session.user.ti))
    .orderBy(desc(schema.addressTenant.id));

  return <AddressTenantTable addresses={addresses} />;
}
