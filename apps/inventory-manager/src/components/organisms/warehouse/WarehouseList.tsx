"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface WarehouseListProps {
  warehouses: RouterOutputs["warehouse"]["list"];
}

export const WarehouseList: FC<WarehouseListProps> = ({ warehouses }) => {
  const context = api.useContext();
  const [data] = api.warehouse.list.useSuspenseQuery(
    {},
    {
      initialData: warehouses,
    },
  );

  const { mutateAsync, isLoading } = api.warehouse.delete.useMutation({
    async onSettled() {
      await context.warehouse.list.invalidate();
      await context.warehouse.get.invalidate();
    },
  });

  return (
    <>
      {data.map((warehouse) => (
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
