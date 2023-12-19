import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { SupplierTable } from "~/components/organisms/supplier/SupplierTable";

export default async function SuppliersPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const suppliers = await db.query.supplier.findMany({
    where: eq(schema.supplier.tenantId, session.user.ti),
    with: {
      productsToSuppliers: {
        with: {
          product: true,
        },
      },
    },
    orderBy: desc(schema.supplier.id),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.supplier)
      .where(eq(schema.supplier.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <SupplierTable suppliers={suppliers} totalCount={totalCount} />;
}
