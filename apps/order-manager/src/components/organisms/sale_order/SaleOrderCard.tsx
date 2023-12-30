"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SaleOrderCardProps {
  saleOrder: RouterOutputs["saleOrder"]["get"];
  id: NonNullable<RouterOutputs["saleOrder"]["get"]>["id"];
}

export const SaleOrderCard: FC<SaleOrderCardProps> = ({
  saleOrder: initialSaleOrder,
  id,
}) => {
  const utils = api.useUtils();
  const [saleOrder] = api.saleOrder.get.useSuspenseQuery(
    { id },
    {
      initialData: initialSaleOrder,
    },
  );

  const { mutateAsync, isLoading } = api.saleOrder.delete.useMutation({
    async onSettled() {
      await utils.saleOrder.list.invalidate();
      await utils.saleOrder.get.invalidate();
    },
  });

  return (
    <div>
      <span className="pr-4">Company: {saleOrder.company.title}</span>
      <LinkButton href={`/sale-orders/${saleOrder.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(saleOrder.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
