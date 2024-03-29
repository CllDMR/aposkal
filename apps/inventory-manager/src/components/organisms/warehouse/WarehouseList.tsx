"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

interface WarehouseListProps {
  warehouses: RouterOutputs["warehouse"]["list"];
}

export const WarehouseList: FC<WarehouseListProps> = ({ warehouses }) => {
  const utils = api.useUtils();
  const [result] = api.warehouse.list.useSuspenseQuery(
    {},
    {
      initialData: warehouses,
    },
  );

  const { mutateAsync, isLoading } = api.warehouse.delete.useMutation({
    async onSettled() {
      await utils.warehouse.list.invalidate();
      await utils.warehouse.get.invalidate();
    },
  });

  return (
    <>
      {result.warehouses.map((warehouse) => (
        <div key={warehouse.id}>
          <span>{warehouse.title}</span>
          <LinkButton href={`/warehouses/${warehouse.id}`}>Go</LinkButton>
          <LinkButton href={`/warehouses/${warehouse.id}/edit`}>
            Edit
          </LinkButton>
          <Button
            onClick={async () => await mutateAsync(warehouse.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
