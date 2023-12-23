import { auth } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOfferCreateForm } from "~/components/organisms/sale_offer/SaleOfferCreateForm";

export default async function SaleOfferCreatePage() {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const companies = await db.query.company.findMany({
    where: eq(schema.company.tenantId, session.user.ti),
    orderBy: desc(schema.company.id),
    with: {
      companiesToAddresses: {
        with: { address: true },
      },
    },
  });

  const products = await db.query.product.findMany({
    where: eq(schema.product.tenantId, session.user.ti),
    orderBy: desc(schema.product.id),
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

  const addresses = await db
    .select()
    .from(schema.addressCompany)
    .where(eq(schema.addressCompany.tenantId, session.user.ti))
    .orderBy(desc(schema.addressCompany.id));

  const tenant = await db.query.tenant.findFirst({
    where: eq(schema.tenant.id, session.user.ti),
    orderBy: desc(schema.tenant.id),
    with: {
      address: true,
    },
  });

  return (
    <SaleOfferCreateForm
      companies={companies}
      addresses={addresses}
      tenant={tenant}
      products={products}
    />
  );
}
