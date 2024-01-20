"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

interface SaleOrderListProps {
  saleOrders: RouterOutputs["saleOrder"]["list"];
}

export const SaleOrderList: FC<SaleOrderListProps> = ({ saleOrders }) => {
  const utils = api.useUtils();
  const [result] = api.saleOrder.list.useSuspenseQuery(
    {},
    {
      initialData: saleOrders,
    },
  );

  const { mutateAsync, isLoading } = api.saleOrder.delete.useMutation({
    async onSettled() {
      await utils.saleOrder.list.invalidate();
      await utils.saleOrder.get.invalidate();
    },
  });

  return (
    <>
      {result.saleOrders.map((saleOrder) => (
        <div key={saleOrder.id}>
          <span>Sale Order Company: {saleOrder.company.title}</span>
          <LinkButton href={`/sale-orders/${saleOrder.id}`}>Go</LinkButton>
          <LinkButton href={`/sale-orders/${saleOrder.id}/edit`}>
            Edit
          </LinkButton>
          <Button
            onClick={async () => await mutateAsync(saleOrder.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
