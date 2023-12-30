"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

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
      <span>{warehouse.title}</span>
      <LinkButton href={`/warehouses/${warehouse.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(warehouse.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
