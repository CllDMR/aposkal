import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { WarehouseTable } from "~/components/organisms/warehouse/WarehouseTable";

export default async function WarehousesPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const warehouses = await db
    .select()
    .from(schema.warehouse)
    .where(eq(schema.warehouse.tenantId, session.user.ti))
    .orderBy(desc(schema.warehouse.id));

  return <WarehouseTable warehouses={warehouses} />;
}
