"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressListProps {
  addresses: RouterOutputs["address"]["list"];
}

export const AddressList: FC<AddressListProps> = ({ addresses }) => {
  const context = api.useContext();
  const [data] = api.address.list.useSuspenseQuery(
    {},
    {
      initialData: addresses,
    },
  );

  const { mutateAsync, isLoading } = api.address.delete.useMutation({
    async onSettled() {
      await context.address.list.invalidate();
      await context.address.get.invalidate();
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
