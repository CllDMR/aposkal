import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { CustomerTable } from "~/components/organisms/customer/CustomerTable";

export default async function CustomersPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const customers = await db
    .select()
    .from(schema.customer)
    .where(eq(schema.customer.tenantId, session.user.ti))
    .orderBy(desc(schema.customer.id));

  return <CustomerTable customers={customers} />;
}
