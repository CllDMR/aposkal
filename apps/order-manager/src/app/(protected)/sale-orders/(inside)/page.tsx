import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { SaleOrderTable } from "~/components/organisms/sale_order/SaleOrderTable";

export default async function SaleOrdersPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const saleOrders = await db.query.saleOrder.findMany({
    where: eq(schema.saleOrder.tenantId, session.user.ti),
    with: {
      company: true,
      toAddress: true,
    },
    orderBy: desc(schema.saleOrder.id),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.saleOrder)
      .where(eq(schema.saleOrder.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <SaleOrderTable saleOrders={saleOrders} totalCount={totalCount} />;
}
