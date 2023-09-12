import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductEditForm } from "~/components/organisms/product/ProductEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductEditPage({ params: { id } }: PageProps) {
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

  return <ProductEditForm product={product} />;
}
