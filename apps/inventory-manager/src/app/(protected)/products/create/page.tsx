import { auth } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { ProductCreateForm } from "~/components/organisms/product/ProductCreateForm";

export default async function ProductCreatePage() {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const productCategories = await db
    .select()
    .from(schema.productCategory)
    .where(eq(schema.productCategory.tenantId, session.user.ti))
    .orderBy(desc(schema.productCategory.id));

  const productTags = await db
    .select()
    .from(schema.productTag)
    .where(eq(schema.productTag.tenantId, session.user.ti))
    .orderBy(desc(schema.productTag.id));

  return (
    <ProductCreateForm
      productCategories={productCategories}
      productTags={productTags}
    />
  );
}
