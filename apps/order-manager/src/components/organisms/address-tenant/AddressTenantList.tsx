"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressTenantListProps {
  addresses: RouterOutputs["addressTenant"]["list"];
}

export const AddressTenantList: FC<AddressTenantListProps> = ({
  addresses,
}) => {
  const context = api.useContext();
  const [data] = api.addressTenant.list.useSuspenseQuery(
    {},
    {
      initialData: addresses,
    },
  );

  const { mutateAsync, isLoading } = api.addressTenant.delete.useMutation({
    async onSettled() {
      await context.addressTenant.list.invalidate();
      await context.addressTenant.get.invalidate();
    },
  });

  return (
    <>
      {data.map((address) => (
        <div key={address.id}>
          <span>{address.name}</span>
          <LinkButton href={`/addresses/${address.id}`}>Go</LinkButton>
          <LinkButton href={`/addresses/${address.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(address.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};