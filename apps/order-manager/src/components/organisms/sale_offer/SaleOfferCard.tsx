"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SaleOfferCardProps {
  saleOffer: RouterOutputs["saleOffer"]["get"];
  id: NonNullable<RouterOutputs["saleOffer"]["get"]>["id"];
}

export const SaleOfferCard: FC<SaleOfferCardProps> = ({
  saleOffer: initialSaleOffer,
  id,
}) => {
  const context = api.useContext();
  const [saleOffer] = api.saleOffer.get.useSuspenseQuery(
    { id },
    {
      initialData: initialSaleOffer,
    },
  );

  const { mutateAsync, isLoading } = api.saleOffer.delete.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
      await context.saleOffer.get.invalidate();
    },
  });

  return (
    <div>
      <span className="pr-4">No: {saleOffer.no}</span>
      <LinkButton href={`/sale-offers/${saleOffer.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(saleOffer.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
