import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { ProductTable } from "~/components/organisms/product/ProductTable";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const products = await db.query.product.findMany({
    where: eq(schema.product.tenantId, session.user.ti),
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
    orderBy: desc(schema.product.id),
  });

  return <ProductTable products={products} />;
}
