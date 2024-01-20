"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

interface SaleOfferListProps {
  saleOffers: RouterOutputs["saleOffer"]["list"];
}

export const SaleOfferList: FC<SaleOfferListProps> = ({ saleOffers }) => {
  const utils = api.useUtils();
  const [result] = api.saleOffer.list.useSuspenseQuery(
    {},
    {
      initialData: saleOffers,
    },
  );

  const { mutateAsync, isLoading } = api.saleOffer.delete.useMutation({
    async onSettled() {
      await utils.saleOffer.list.invalidate();
      await utils.saleOffer.get.invalidate();
    },
  });

  return (
    <>
      {result.saleOffers.map((saleOffer) => (
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
