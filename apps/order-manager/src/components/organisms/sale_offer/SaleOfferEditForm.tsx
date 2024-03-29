"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { saleOfferUpdateInput } from "@acme/api/src/inputs/sale_offer/sale_offer";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDateInput, FormDropdownInput } from "@acme/ui/molecules";

type SaleOfferEditFormFields = RouterInputs["saleOffer"]["update"];

interface SaleOfferEditFormProps {
  saleOffer: NonNullable<RouterOutputs["saleOffer"]["get"]>;
  companies: RouterOutputs["company"]["list"]["companies"];
}

export const SaleOfferEditForm: FC<SaleOfferEditFormProps> = ({
  saleOffer: initialSaleOffer,
  companies: initialCompanies,
}) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.saleOffer.update.useMutation({
    async onSettled() {
      await utils.saleOffer.list.invalidate();
      await utils.saleOffer.get.invalidate();
    },
  });

  const [saleOffer] = api.saleOffer.get.useSuspenseQuery(
    { id: initialSaleOffer.id },
    { initialData: initialSaleOffer },
  );

  const {
    data: { companies },
  } = api.company.list.useQuery(
    {},
    {
      initialData: { companies: initialCompanies, totalCount: 0 },
    },
  );

  const formattedCompanies =
    companies?.map((company) => ({
      id: company.id,
      label: company.title,
      value: company.id,
    })) ?? [];

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<SaleOfferEditFormFields>({
    resolver: zodResolver(saleOfferUpdateInput),
    defaultValues: saleOfferUpdateInput.parse(saleOffer),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  // const { saleOfferNotes: _, saleOfferProducts: __, ...restErrors } = errors;

  return (
    <Form onSubmit={onSubmit}>
      <FormDateInput<SaleOfferEditFormFields>
        id="startDate"
        label="Start Date"
        name="startDate"
        control={control}
        // errors={restErrors}
      />
      <FormDateInput<SaleOfferEditFormFields>
        id="endDate"
        label="End Date"
        name="endDate"
        control={control}
        // errors={restErrors}
      />
      <FormDropdownInput<SaleOfferEditFormFields>
        label="Company"
        name="companyId"
        // errors={restErrors}
        control={control}
        options={formattedCompanies}
      />

      {/* <FormInput<SaleOfferEditFormFields>
        id="companyType"
        label="Company Type"
        name="companyType"
        type="text"
        // errors={restErrors}
        register={register}
      /> */}

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
