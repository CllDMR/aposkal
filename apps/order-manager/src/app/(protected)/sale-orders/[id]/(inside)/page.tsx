import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SaleOrderCard } from "~/components/organisms/sale_order/SaleOrderCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SaleOrderPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const saleOrder = await db.query.saleOrder.findFirst({
    where: and(
      eq(schema.saleOrder.tenantId, session.user.ti),
      eq(schema.saleOrder.id, id),
    ),
    with: {
      customer: true,
      toAddress: true,
    },
  });

  if (!saleOrder) notFound();

  return <SaleOrderCard saleOrder={saleOrder} id={id} />;
}
