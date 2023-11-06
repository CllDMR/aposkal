import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOfferCreateForm } from "~/components/organisms/sale_offer/SaleOfferCreateForm";

export default async function SaleOfferCreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const companies = await db.query.company.findMany({
    where: eq(schema.company.tenantId, session.user.ti),
    orderBy: desc(schema.company.id),
    with: {
      address: true,
    },
  });

  const addresses = await db
    .select()
    .from(schema.address)
    .where(eq(schema.address.tenantId, session.user.ti))
    .orderBy(desc(schema.address.id));

  return <SaleOfferCreateForm companies={companies} addresses={addresses} />;
}
