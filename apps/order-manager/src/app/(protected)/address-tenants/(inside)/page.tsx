import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { AddressTenantTable } from "~/components/organisms/address-tenant/AddressTenantTable";

export default async function AddressCompaniesPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const addressTenants = await db
    .select()
    .from(schema.addressTenant)
    .where(eq(schema.addressTenant.tenantId, session.user.ti))
    .orderBy(desc(schema.addressTenant.id))
    .offset(pageIndex * pageSize)
    .limit(pageSize);

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.addressTenant)
      .where(eq(schema.addressTenant.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return (
    <AddressTenantTable
      addressTenants={addressTenants}
      totalCount={totalCount}
    />
  );
}
