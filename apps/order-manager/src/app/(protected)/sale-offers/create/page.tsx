import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOfferCreateForm } from "~/components/organisms/sale_offer/SaleOfferCreateForm";

export default async function SaleOfferCreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const customers = await db
    .select()
    .from(schema.customer)
    .where(eq(schema.customer.tenantId, session.user.ti))
    .orderBy(desc(schema.customer.id));

  return <SaleOfferCreateForm customers={customers} />;
}
