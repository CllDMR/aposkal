import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { AddressEditForm } from "~/components/organisms/address/AddressEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AddressEditPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const address = await db
    .select()
    .from(schema.address)
    .where(
      and(
        eq(schema.address.tenantId, session.user.ti),
        eq(schema.address.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!address) notFound();

  return <AddressEditForm address={address} />;
}
