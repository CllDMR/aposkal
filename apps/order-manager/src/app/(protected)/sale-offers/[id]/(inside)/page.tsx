import { notFound } from "next/navigation";

import { authOptions, getServerSession } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SaleOfferCard } from "~/components/organisms/sale_offer/SaleOfferCard";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SaleOfferPage({ params: { id } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const saleOffer = await db.query.saleOffer.findFirst({
    where: and(
      eq(schema.saleOffer.tenantId, session.user.ti),
      eq(schema.saleOffer.id, id),
    ),
    with: {
      company: true,
      toAddress: true,
      saleOfferNotes: true,
      saleOfferProducts: true,
    },
  });

  if (!saleOffer) notFound();

  return <SaleOfferCard saleOffer={saleOffer} id={id} />;
}
