"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SaleOfferListProps {
  saleOffers: RouterOutputs["saleOffer"]["list"];
}

export const SaleOfferList: FC<SaleOfferListProps> = ({ saleOffers }) => {
  const context = api.useContext();
  const [data] = api.saleOffer.list.useSuspenseQuery(
    {},
    {
      initialData: saleOffers,
    },
  );

  const { mutateAsync, isLoading } = api.saleOffer.delete.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
      await context.saleOffer.get.invalidate();
    },
  });

  return (
    <>
      {data.map((saleOffer) => (
        <div key={saleOffer.id}>
          <span>{saleOffer.no}</span>
          <LinkButton href={`/sale-offers/${saleOffer.id}`}>Go</LinkButton>
          <LinkButton href={`/sale-offers/${saleOffer.id}/edit`}>
            Edit
          </LinkButton>
          <Button
            onClick={async () => await mutateAsync(saleOffer.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
