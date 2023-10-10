import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SaleOrderEditForm } from "~/components/organisms/sale_order/SaleOrderEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SaleOrderEditPage({ params: { id } }: PageProps) {
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

  const customers = await db.query.customer.findMany({
    where: and(
      eq(schema.customer.tenantId, session.user.ti),
      eq(schema.customer.id, id),
    ),
  });

  return <SaleOrderEditForm saleOrder={saleOrder} customers={customers} />;
}
