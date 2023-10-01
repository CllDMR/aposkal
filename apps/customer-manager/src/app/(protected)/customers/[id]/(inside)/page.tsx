import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { CustomerCard } from "~/components/organisms/customer/CustomerCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CustomerPage({ params: { id } }: PageProps) {
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

  return <CustomerCard initCustomer={customer} id={id} />;
}
