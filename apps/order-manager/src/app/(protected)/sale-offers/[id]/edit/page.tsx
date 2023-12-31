import { notFound } from "next/navigation";

import { auth } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

import { SaleOfferEditForm } from "~/components/organisms/sale_offer/SaleOfferEditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SaleOfferEditPage({ params: { id } }: PageProps) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const saleOffer = await db.query.saleOffer.findFirst({
    where: and(
      eq(schema.saleOffer.tenantId, session.user.ti),
      eq(schema.saleOffer.id, id),
    ),
    with: {
      company: true,
      toAddress: true,
    },
  });

  if (!saleOffer) notFound();

  const companies = await db.query.company.findMany({
    where: and(
      eq(schema.company.tenantId, session.user.ti),
      eq(schema.company.id, id),
    ),
    with: {
      companiesToAddresses: {
        with: { address: true },
      },
    },
  });

  return <SaleOfferEditForm saleOffer={saleOffer} companies={companies} />;
}
