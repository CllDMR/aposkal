"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressListProps {
  addresss: RouterOutputs["address"]["list"];
}

export const AddressList: FC<AddressListProps> = ({ addresss }) => {
  const context = api.useContext();
  const [data] = api.address.list.useSuspenseQuery(
    {},
    {
      initialData: addresss,
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
          <LinkButton href={`/addresss/${address.id}`}>Go</LinkButton>
          <LinkButton href={`/addresss/${address.id}/edit`}>Edit</LinkButton>
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
