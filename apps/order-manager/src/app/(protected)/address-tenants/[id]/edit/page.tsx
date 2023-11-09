import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { AddressTenantEditForm } from "~/components/organisms/address-tenant/AddressTenantEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AddressTenantEditPage({
  params: { id },
}: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const address = await db
    .select()
    .from(schema.addressTenant)
    .where(
      and(
        eq(schema.addressTenant.tenantId, session.user.ti),
        eq(schema.addressTenant.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!address) notFound();

  return <AddressTenantEditForm address={address} />;
}
