import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { ProductTagEditForm } from "~/components/organisms/product_tag/ProductTagEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductTagEditPage({
  params: { id },
}: PageProps) {
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

  return <ProductTagEditForm productTag={productTag} />;
}
