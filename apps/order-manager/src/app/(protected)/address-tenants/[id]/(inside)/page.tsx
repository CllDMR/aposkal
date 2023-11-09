import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { AddressTenantCard } from "~/components/organisms/address-tenant/AddressTenantCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AddressPage({ params: { id } }: PageProps) {
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

  return <AddressTenantCard initAddress={address} id={id} />;
}
