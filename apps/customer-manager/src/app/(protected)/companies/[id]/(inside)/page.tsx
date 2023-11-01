import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { CompanyCard } from "~/components/organisms/company/CompanyCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CompanyPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const company = await db
    .select()
    .from(schema.company)
    .where(
      and(
        eq(schema.company.tenantId, session.user.ti),
        eq(schema.company.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!company) notFound();

  return <CompanyCard initCompany={company} id={id} />;
}
