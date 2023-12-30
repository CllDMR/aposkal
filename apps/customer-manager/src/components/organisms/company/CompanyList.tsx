"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface CompanyListProps {
  companies: RouterOutputs["company"]["list"];
}

export const CompanyList: FC<CompanyListProps> = ({ companies }) => {
  const utils = api.useUtils();
  const [result] = api.company.list.useSuspenseQuery(
    {},
    {
      initialData: companies,
    },
  );

  const { mutateAsync, isLoading } = api.company.delete.useMutation({
    async onSettled() {
      await utils.company.list.invalidate();
      await utils.company.get.invalidate();
    },
  });

  return (
    <>
      {result.companies.map((company) => (
        <div key={company.id}>
          <span>{company.title}</span>
          <LinkButton href={`/companies/${company.id}`}>Go</LinkButton>
          <LinkButton href={`/companies/${company.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(company.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
