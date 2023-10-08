import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SaleOfferEditForm } from "~/components/organisms/sale_offer/SaleOfferEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SaleOfferEditPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const saleOffer = await db.query.saleOffer.findFirst({
    where: and(
      eq(schema.saleOffer.tenantId, session.user.ti),
      eq(schema.saleOffer.id, id),
    ),
  });

  if (!saleOffer) notFound();

  return <SaleOfferEditForm saleOffer={saleOffer} />;
}
