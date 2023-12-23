import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { AddressCompanyCard } from "~/components/organisms/address-company/AddressCompanyCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AddressPage({ params: { id } }: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const address = await db
    .select()
    .from(schema.addressCompany)
    .where(
      and(
        eq(schema.addressCompany.tenantId, session.user.ti),
        eq(schema.addressCompany.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!address) notFound();

  return <AddressCompanyCard initAddress={address} id={id} />;
}
