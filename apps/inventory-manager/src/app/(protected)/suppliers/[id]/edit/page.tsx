import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
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

  const supplier = await db.query.supplier.findFirst({
    where: and(
      eq(schema.supplier.tenantId, session.user.ti),
      eq(schema.supplier.id, id),
    ),
    with: {
      productsToSuppliers: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!supplier) notFound();

  return <SupplierEditForm supplier={supplier} />;
}
