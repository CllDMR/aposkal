import { auth } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SupplierCreateForm } from "~/components/organisms/supplier/SupplierCreateForm";

export default async function SupplierCreatePage() {
  const session = await auth();
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

  return <SupplierCreateForm products={products} />;
}
