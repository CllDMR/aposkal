import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SupplierTable } from "~/components/organisms/supplier/SupplierTable";

export default async function SuppliersPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const suppliers = await db
    .select()
    .from(schema.supplier)
    .where(eq(schema.supplier.tenantId, session.user.ti))
    .orderBy(desc(schema.supplier.id));

  return <SupplierTable suppliers={suppliers} />;
}
