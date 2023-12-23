import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, desc, eq, schema } from "@acme/db";

import { ProductEditForm } from "~/components/organisms/product/ProductEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductEditPage({ params: { id } }: PageProps) {
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

  const product = await db.query.product.findFirst({
    where: and(
      eq(schema.product.tenantId, session.user.ti),
      eq(schema.product.id, id),
    ),
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
  });

  if (!product) notFound();

  return (
    <ProductEditForm
      productCategories={productCategories}
      productTags={productTags}
      product={product}
    />
  );
}
