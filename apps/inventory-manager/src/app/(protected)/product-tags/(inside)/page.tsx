import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { ProductTagTable } from "~/components/organisms/product_tag/ProductTagTable";

export default async function ProductTagsPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const productTags = await db
    .select()
    .from(schema.productTag)
    .where(eq(schema.productTag.tenantId, session.user.ti))
    .orderBy(desc(schema.productTag.id));

  return <ProductTagTable productTags={productTags} />;
}
