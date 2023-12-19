import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { CompanyTable } from "~/components/organisms/company/CompanyTable";

export default async function CompaniesPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const companies = await db.query.company.findMany({
    where: eq(schema.company.tenantId, session.user.ti),
    with: {
      companiesToAddresses: {
        with: { address: true },
      },
    },
    orderBy: desc(schema.company.id),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.company)
      .where(eq(schema.company.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <CompanyTable companies={companies} totalCount={totalCount} />;
}
