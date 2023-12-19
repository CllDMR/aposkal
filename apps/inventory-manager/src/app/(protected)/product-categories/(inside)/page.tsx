import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { ProductCategoryTable } from "~/components/organisms/product_category/ProductCategoryTable";

export default async function ProductCategoriesPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const productCategories = await db
    .select()
    .from(schema.productCategory)
    .where(eq(schema.productCategory.tenantId, session.user.ti))
    .orderBy(desc(schema.productCategory.id))
    .offset(pageIndex * pageSize)
    .limit(pageSize);

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.productCategory)
      .where(eq(schema.productCategory.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return (
    <ProductCategoryTable
      productCategories={productCategories}
      totalCount={totalCount}
    />
  );
}
