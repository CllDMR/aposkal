import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { AddressCompanyEditForm } from "~/components/organisms/address-company/AddressCompanyEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AddressCompanyEditPage({
  params: { id },
}: PageProps) {
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

  return <AddressCompanyEditForm address={address} />;
}
