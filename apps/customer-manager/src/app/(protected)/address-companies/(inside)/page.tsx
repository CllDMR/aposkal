import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { AddressCompanyTable } from "~/components/organisms/address-company/AddressCompanyTable";

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

  const addressCompanies = await db
    .select()
    .from(schema.addressCompany)
    .where(eq(schema.addressCompany.tenantId, session.user.ti))
    .orderBy(desc(schema.addressCompany.id))
    .offset(pageIndex * pageSize)
    .limit(pageSize);

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.addressCompany)
      .where(eq(schema.addressCompany.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return (
    <AddressCompanyTable
      addressCompanies={addressCompanies}
      totalCount={totalCount}
    />
  );
}
