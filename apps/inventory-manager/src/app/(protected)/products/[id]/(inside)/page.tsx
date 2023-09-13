import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductCard } from "~/components/organisms/product/ProductCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const product = await db
    .select()
    .from(schema.product)
    .where(
      and(
        eq(schema.product.tenantId, session.user.ti),
        eq(schema.product.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!product) notFound();

  return <ProductCard initProduct={product} id={id} />;
}