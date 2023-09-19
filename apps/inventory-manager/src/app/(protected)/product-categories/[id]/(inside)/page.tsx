import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductCategoryCard } from "~/components/organisms/product_category/ProductCategoryCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductCategoryPage({
  params: { id },
}: PageProps) {
  const session = await getServerSession(authOptions);
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

  return <ProductCategoryCard initProductCategory={productCategory} id={id} />;
}
