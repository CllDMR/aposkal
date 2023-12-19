import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { WarehouseTable } from "~/components/organisms/warehouse/WarehouseTable";

export default async function WarehousesPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const warehouses = await db
    .select()
    .from(schema.warehouse)
    .where(eq(schema.warehouse.tenantId, session.user.ti))
    .orderBy(desc(schema.warehouse.id))
    .offset(pageIndex * pageSize)
    .limit(pageSize);

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.warehouse)
      .where(eq(schema.warehouse.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <WarehouseTable warehouses={warehouses} totalCount={totalCount} />;
}
