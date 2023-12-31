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
  const utils = api.useUtils();
  const [result] = api.addressCompany.list.useSuspenseQuery(
    {},
    {
      initialData: addresses,
    },
  );

  const { mutateAsync, isLoading } = api.addressCompany.delete.useMutation({
    async onSettled() {
      await utils.addressCompany.list.invalidate();
      await utils.addressCompany.get.invalidate();
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
