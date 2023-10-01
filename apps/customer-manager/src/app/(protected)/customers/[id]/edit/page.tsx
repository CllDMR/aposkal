import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { CustomerEditForm } from "~/components/organisms/customer/CustomerEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CustomerEditPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const customer = await db
    .select()
    .from(schema.customer)
    .where(
      and(
        eq(schema.customer.tenantId, session.user.ti),
        eq(schema.customer.id, id),
      ),
    )
    .limit(1)
    .then((a) => a[0]);

  if (!customer) notFound();

  return <CustomerEditForm customer={customer} />;
}
