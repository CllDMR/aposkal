import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { CompanyTable } from "~/components/organisms/company/CompanyTable";

export default async function CompaniesPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const companies = await db.query.company.findMany({
    where: eq(schema.company.tenantId, session.user.ti),
    orderBy: desc(schema.company.id),
    with: { addresses: true },
  });

  return <CompanyTable companies={companies} />;
}
