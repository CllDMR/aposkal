"use client";

import type { FC } from "react";

import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";

interface WarehouseCardProps {
  initWarehouse: RouterOutputs["warehouse"]["get"];
  id: NonNullable<RouterOutputs["warehouse"]["get"]>["id"];
}

export const WarehouseCard: FC<WarehouseCardProps> = ({
  initWarehouse,
  id,
}) => {
  const utils = api.useUtils();
  const [warehouse] = api.warehouse.get.useSuspenseQuery(
    { id },
    {
      initialData: initWarehouse,
    },
  );

  const { mutateAsync, isLoading } = api.warehouse.delete.useMutation({
    async onSettled() {
      await utils.warehouse.list.invalidate();
      await utils.warehouse.get.invalidate();
    },
  });

  return (
    <div>
      <ItemHeader
        disabled={isLoading}
        editHref={`/warehouses/${warehouse.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(warehouse.id))}
        title={warehouse.title}
      />
    </div>
  );
};
