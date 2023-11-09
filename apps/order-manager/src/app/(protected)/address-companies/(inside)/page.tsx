import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { AddressCompanyTable } from "~/components/organisms/address-company/AddressCompanyTable";

export default async function AddressCompaniesPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const addresses = await db
    .select()
    .from(schema.addressCompany)
    .where(eq(schema.addressCompany.tenantId, session.user.ti))
    .orderBy(desc(schema.addressCompany.id));

  return <AddressCompanyTable addresses={addresses} />;
}
