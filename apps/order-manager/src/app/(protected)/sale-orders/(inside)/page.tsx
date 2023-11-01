import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOrderTable } from "~/components/organisms/sale_order/SaleOrderTable";

export default async function SaleOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const saleOrders = await db.query.saleOrder.findMany({
    where: eq(schema.saleOrder.tenantId, session.user.ti),
    orderBy: desc(schema.saleOrder.id),
    with: {
      company: true,
      toAddress: true,
    },
  });

  return <SaleOrderTable saleOrders={saleOrders} />;
}
