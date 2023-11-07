import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { CompanyEditForm } from "~/components/organisms/company/CompanyEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CompanyEditPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const company = await db.query.company.findFirst({
    where: and(
      eq(schema.company.tenantId, session.user.ti),
      eq(schema.company.id, id),
    ),
    with: {
      addresses: true,
    },
  });

  if (!company) notFound();

  return <CompanyEditForm company={company} />;
}
