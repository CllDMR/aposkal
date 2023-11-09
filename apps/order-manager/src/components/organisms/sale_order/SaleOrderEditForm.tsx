"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOrderUpdateInput } from "@acme/api/src/inputs/sale_order/sale_order";
import { Form, FormBottom } from "@acme/ui/atoms";
import {
  Button,
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOrderEditFormFields = RouterInputs["saleOrder"]["update"];

interface SaleOrderEditFormProps {
  saleOrder: NonNullable<RouterOutputs["saleOrder"]["get"]>;
  companies: RouterOutputs["company"]["list"];
}

export const SaleOrderEditForm: FC<SaleOrderEditFormProps> = ({
  saleOrder: initialSaleOrder,
  companies: initialCompanies,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOrder.update.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
      await context.saleOrder.get.invalidate();
    },
  });

  const [saleOrder] = api.saleOrder.get.useSuspenseQuery(
    { id: initialSaleOrder.id },
    { initialData: initialSaleOrder },
  );

  const { data: companies } = api.company.list.useQuery(
    {},
    {
      initialData: initialCompanies,
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
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SaleOrderEditFormFields>({
    resolver: zodResolver(saleOrderUpdateInput),
    defaultValues: saleOrderUpdateInput.parse(saleOrder),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<SaleOrderEditFormFields>
        id="priority"
        label="Priority"
        name="priority"
        type="text"
        errors={errors}
        register={register}
      />
      <FormDateInput<SaleOrderEditFormFields>
        id="startdate"
        label="Start Date"
        name="startdate"
        control={control}
        errors={errors}
      />
      <FormDateInput<SaleOrderEditFormFields>
        id="enddate"
        label="End Date"
        name="enddate"
        control={control}
        errors={errors}
      />
      <FormDropdownInput<SaleOrderEditFormFields>
        label="Company"
        name="companyId"
        errors={errors}
        control={control}
        options={formattedCompanies}
      />

      <FormInput<SaleOrderEditFormFields>
        id="companyType"
        label="Company Type"
        name="companyType"
        type="text"
        errors={errors}
        register={register}
      />
      <FormInput<SaleOrderEditFormFields>
        id="source"
        label="Source"
        name="source"
        type="text"
        errors={errors}
        register={register}
      />

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
