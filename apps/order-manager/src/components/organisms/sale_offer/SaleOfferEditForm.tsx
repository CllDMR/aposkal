"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOfferUpdateInput } from "@acme/api/src/inputs/sale_offer";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDateInput, FormDropdownInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOfferEditFormFields = RouterInputs["saleOffer"]["update"];

interface SaleOfferEditFormProps {
  saleOffer: NonNullable<RouterOutputs["saleOffer"]["get"]>;
  customers: RouterOutputs["customer"]["list"];
}

export const SaleOfferEditForm: FC<SaleOfferEditFormProps> = ({
  saleOffer: initialSaleOffer,
  customers: initialCustomers,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOffer.update.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
      await context.saleOffer.get.invalidate();
    },
  });

  const [saleOffer] = api.saleOffer.get.useSuspenseQuery(
    { id: initialSaleOffer.id },
    { initialData: initialSaleOffer },
  );

  const { data: customers } = api.customer.list.useQuery(
    {},
    {
      initialData: initialCustomers,
    },
  );

  const formattedCustomers =
    customers?.map((customer) => ({
      id: customer.id,
      label: `${customer.firstname} ${customer.middlename} ${customer.lastname}`,
      value: customer.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SaleOfferEditFormFields>({
    resolver: zodResolver(saleOfferUpdateInput),
    defaultValues: saleOfferUpdateInput.parse(saleOffer),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormDateInput<SaleOfferEditFormFields>
        id="startDate"
        label="Start Date"
        name="startDate"
        control={control}
        errors={errors}
      />
      <FormDateInput<SaleOfferEditFormFields>
        id="endDate"
        label="End Date"
        name="endDate"
        control={control}
        errors={errors}
      />
      <FormDropdownInput<SaleOfferEditFormFields>
        label="Customer"
        name="customerId"
        errors={errors}
        control={control}
        options={formattedCustomers}
      />

      {/* <FormInput<SaleOfferEditFormFields>
        id="customerType"
        label="Customer Type"
        name="customerType"
        type="text"
        errors={errors}
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
