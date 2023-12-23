import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { WarehouseEditForm } from "~/components/organisms/warehouse/WarehouseEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function WarehouseEditPage({ params: { id } }: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const warehouse = await db
    .select()
    .from(schema.warehouse)
    .where(
      and(
        eq(schema.warehouse.tenantId, session.user.ti),
        eq(schema.warehouse.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!warehouse) notFound();

  return <WarehouseEditForm warehouse={warehouse} />;
}
