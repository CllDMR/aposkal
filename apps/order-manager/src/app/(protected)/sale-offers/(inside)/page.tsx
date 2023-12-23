import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";

import { SaleOfferTable } from "~/components/organisms/sale_offer/SaleOfferTable";

export default async function SaleOffersPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const saleOffers = await db.query.saleOffer.findMany({
    where: eq(schema.saleOffer.tenantId, session.user.ti),
    with: {
      company: true,
      toAddress: true,
    },
    orderBy: desc(schema.saleOffer.id),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.saleOffer)
      .where(eq(schema.saleOffer.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return <SaleOfferTable saleOffers={saleOffers} totalCount={totalCount} />;
}
