"use client";

import type { FC } from "react";

import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";

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
      <ItemHeader
        disabled={isLoading}
        editHref={`/sale-orders/${saleOrder.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(saleOrder.id))}
        title={saleOrder.id}
      />
    </div>
  );
};
