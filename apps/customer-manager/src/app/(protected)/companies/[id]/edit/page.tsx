import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, desc, eq, schema } from "@acme/db";

import { CompanyEditForm } from "~/components/organisms/company/CompanyEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CompanyEditPage({ params: { id } }: PageProps) {
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

  const addresses = await db
    .select()
    .from(schema.address)
    .where(eq(schema.address.tenantId, session.user.ti))
    .orderBy(desc(schema.address.id));

  return <CompanyEditForm company={company} addresses={addresses} />;
}
