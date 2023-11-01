import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { CompanyCreateForm } from "~/components/organisms/company/CompanyCreateForm";

export default async function CompanyCreatePage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const addresses = await db
    .select()
    .from(schema.address)
    .where(eq(schema.address.tenantId, session.user.ti))
    .orderBy(desc(schema.address.id));

  return <CompanyCreateForm addresses={addresses} />;
}
