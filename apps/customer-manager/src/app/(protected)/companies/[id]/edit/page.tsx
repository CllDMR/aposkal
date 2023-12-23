import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { CompanyEditForm } from "~/components/organisms/company/CompanyEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CompanyEditPage({ params: { id } }: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const company = await db.query.company.findFirst({
    where: and(
      eq(schema.company.tenantId, session.user.ti),
      eq(schema.company.id, id),
    ),
    with: {
      companiesToAddresses: {
        with: { address: true },
      },
    },
  });

  if (!company) notFound();

  return <CompanyEditForm company={company} />;
}
