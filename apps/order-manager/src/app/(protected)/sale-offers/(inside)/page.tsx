import { authOptions, getServerSession } from "@acme/auth";
import { db, desc, eq, schema } from "@acme/db";

import { SaleOfferTable } from "~/components/organisms/sale_offer/SaleOfferTable";

export default async function SaleOffersPage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No Session");

  const saleOffers = await db.query.saleOffer.findMany({
    where: eq(schema.saleOffer.tenantId, session.user.ti),
    orderBy: desc(schema.saleOffer.id),
    with: {
      customer: true,
      toAddress: true,
    },
  });

  return <SaleOfferTable saleOffers={saleOffers} />;
}
