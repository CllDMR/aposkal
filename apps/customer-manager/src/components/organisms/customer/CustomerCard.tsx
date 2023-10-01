"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface CustomerCardProps {
  initCustomer: RouterOutputs["customer"]["get"];
  id: NonNullable<RouterOutputs["customer"]["get"]>["id"];
}

export const CustomerCard: FC<CustomerCardProps> = ({ initCustomer, id }) => {
  const context = api.useContext();
  const [customer] = api.customer.get.useSuspenseQuery(
    { id },
    {
      initialData: initCustomer,
    },
  );

  const { mutateAsync, isLoading } = api.customer.delete.useMutation({
    async onSettled() {
      await context.customer.list.invalidate();
      await context.customer.get.invalidate();
    },
  });

  return (
    <div>
      <span>
        {customer.firstname} {customer.middlename} {customer.lastname}
      </span>
      <LinkButton href={`/customers/${customer.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(customer.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
