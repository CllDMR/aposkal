import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { ProductTable } from "~/components/organisms/product/ProductTable";

export default async function ProductsPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const products = await db.query.product.findMany({
    where: eq(schema.product.tenantId, session.user.ti),
    with: {
      productsToCategories: {
        with: {
          productCategory: true,
        },
      },
      productsToTags: {
        with: {
          productTag: true,
        },
      },
    },
    orderBy: desc(schema.product.id),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.product)
      .where(eq(schema.product.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <ProductTable products={products} totalCount={totalCount} />;
}
