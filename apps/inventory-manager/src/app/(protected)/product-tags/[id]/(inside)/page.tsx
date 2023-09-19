import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductTagCard } from "~/components/organisms/product_tag/ProductTagCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductTagPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const productTag = await db
    .select()
    .from(schema.productTag)
    .where(
      and(
        eq(schema.productTag.tenantId, session.user.ti),
        eq(schema.productTag.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!productTag) notFound();

  return <ProductTagCard initProductTag={productTag} id={id} />;
}
