import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { ProductCategoryTable } from "~/components/organisms/product_category/ProductCategoryTable";

export default async function ProductCategoriesPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const productCategories = await db
    .select()
    .from(schema.product)
    .where(eq(schema.product.tenantId, session.user.ti))
    .orderBy(desc(schema.product.id));

  return <ProductCategoryTable productCategories={productCategories} />;
}
