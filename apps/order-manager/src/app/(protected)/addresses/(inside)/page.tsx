import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { AddressTable } from "~/components/organisms/address/AddressTable";

export default async function AddresssPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const addresss = await db
    .select()
    .from(schema.address)
    .where(eq(schema.address.tenantId, session.user.ti))
    .orderBy(desc(schema.address.id));

  return <AddressTable addresss={addresss} />;
}
