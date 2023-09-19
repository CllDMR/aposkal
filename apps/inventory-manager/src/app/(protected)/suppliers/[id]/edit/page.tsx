import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SupplierEditForm } from "~/components/organisms/supplier/SupplierEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SupplierEditPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const supplier = await db
    .select()
    .from(schema.supplier)
    .where(
      and(
        eq(schema.supplier.tenantId, session.user.ti),
        eq(schema.supplier.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!supplier) notFound();

  return <SupplierEditForm supplier={supplier} />;
}
