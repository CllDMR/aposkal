"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SaleOrderListProps {
  saleOrders: RouterOutputs["saleOrder"]["list"];
}

export const SaleOrderList: FC<SaleOrderListProps> = ({ saleOrders }) => {
  const context = api.useContext();
  const [result] = api.saleOrder.list.useSuspenseQuery(
    {},
    {
      initialData: saleOrders,
    },
  );

  const { mutateAsync, isLoading } = api.saleOrder.delete.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
      await context.saleOrder.get.invalidate();
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
