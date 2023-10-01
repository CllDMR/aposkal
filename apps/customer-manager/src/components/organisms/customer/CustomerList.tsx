"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface CustomerListProps {
  customers: RouterOutputs["customer"]["list"];
}

export const CustomerList: FC<CustomerListProps> = ({ customers }) => {
  const context = api.useContext();
  const [data] = api.customer.list.useSuspenseQuery(
    {},
    {
      initialData: customers,
    },
  );

  const { mutateAsync, isLoading } = api.customer.delete.useMutation({
    async onSettled() {
      await context.customer.list.invalidate();
      await context.customer.get.invalidate();
    },
  });

  return (
    <>
      {data.map((customer) => (
        <div key={customer.id}>
          <span>
            {customer.firstname} {customer.middlename} {customer.lastname}
          </span>
          <LinkButton href={`/customers/${customer.id}`}>Go</LinkButton>
          <LinkButton href={`/customers/${customer.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(customer.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
