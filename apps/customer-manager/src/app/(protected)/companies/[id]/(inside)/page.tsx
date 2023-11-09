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

  return <CompanyCard initCompany={company} id={id} />;
}
