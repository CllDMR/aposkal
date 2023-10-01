import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOrderCreateForm } from "~/components/organisms/sale_order/SaleOrderCreateForm";

export default async function SaleOrderCreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const addresses = await db
    .select()
    .from(schema.address)
    .where(eq(schema.address.tenantId, session.user.ti))
    .orderBy(desc(schema.address.id));

  const customers = await db
    .select()
    .from(schema.customer)
    .where(eq(schema.customer.tenantId, session.user.ti))
    .orderBy(desc(schema.customer.id));

  return <SaleOrderCreateForm addresses={addresses} customers={customers} />;
}
