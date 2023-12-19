"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressCompanyListProps {
  addresses: RouterOutputs["addressCompany"]["list"];
}

export const AddressCompanyList: FC<AddressCompanyListProps> = ({
  addresses,
}) => {
  const context = api.useContext();
  const [result] = api.addressCompany.list.useSuspenseQuery(
    {},
    {
      initialData: addresses,
    },
  );

  const { mutateAsync, isLoading } = api.addressCompany.delete.useMutation({
    async onSettled() {
      await context.addressCompany.list.invalidate();
      await context.addressCompany.get.invalidate();
    },
  });

  return (
    <>
      {result.addressCompanies.map((address) => (
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
