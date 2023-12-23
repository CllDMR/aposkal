import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductCard } from "~/components/organisms/product/ProductCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params: { id } }: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

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

  return <ProductCard product={product} id={id} />;
}
