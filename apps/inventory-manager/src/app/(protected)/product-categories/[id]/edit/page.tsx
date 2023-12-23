import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductCategoryEditForm } from "~/components/organisms/product_category/ProductCategoryEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductCategoryEditPage({
  params: { id },
}: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const productCategory = await db
    .select()
    .from(schema.productCategory)
    .where(
      and(
        eq(schema.productCategory.tenantId, session.user.ti),
        eq(schema.productCategory.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!productCategory) notFound();

  return <ProductCategoryEditForm productCategory={productCategory} />;
}
