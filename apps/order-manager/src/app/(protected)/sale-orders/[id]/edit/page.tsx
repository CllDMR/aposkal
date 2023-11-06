import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, desc, eq, schema } from "@acme/db";

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
      company: true,
      toAddress: true,
    },
  });

  if (!saleOrder) notFound();

  const companies = await db.query.company.findMany({
    where: and(
      eq(schema.company.tenantId, session.user.ti),
      eq(schema.company.id, id),
    ),
    orderBy: desc(schema.company.id),
    with: {
      address: true,
    },
  });

  return <SaleOrderEditForm saleOrder={saleOrder} companies={companies} />;
}
