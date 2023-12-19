import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { ProductTagTable } from "~/components/organisms/product_tag/ProductTagTable";

export default async function ProductTagsPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const productTags = await db
    .select()
    .from(schema.productTag)
    .where(eq(schema.productTag.tenantId, session.user.ti))
    .orderBy(desc(schema.productTag.id))
    .offset(pageIndex * pageSize)
    .limit(pageSize);

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.productTag)
      .where(eq(schema.productTag.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <ProductTagTable productTags={productTags} totalCount={totalCount} />;
}
