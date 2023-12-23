import { auth } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOrderCreateForm } from "~/components/organisms/sale_order/SaleOrderCreateForm";

export default async function SaleOrderCreatePage() {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const addresses = await db
    .select()
    .from(schema.addressCompany)
    .where(eq(schema.addressCompany.tenantId, session.user.ti))
    .orderBy(desc(schema.addressCompany.id));

  const companies = await db.query.company.findMany({
    where: eq(schema.company.tenantId, session.user.ti),
    orderBy: desc(schema.company.id),
    with: {
      companiesToAddresses: {
        with: { address: true },
      },
    },
  });

  return <SaleOrderCreateForm addresses={addresses} companies={companies} />;
}
