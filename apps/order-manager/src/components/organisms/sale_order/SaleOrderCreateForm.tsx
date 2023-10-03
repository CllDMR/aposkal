"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOrderCreateInput } from "@acme/api/src/inputs/sale_order";
import { Form, FormSection } from "@acme/ui/atoms";
import {
  Button,
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOrderCreateFormFields = RouterInputs["saleOrder"]["create"];

interface SaleOrderCreateFormProps {
  customers: RouterOutputs["customer"]["list"];
  addresses: RouterOutputs["address"]["list"];
}

export const SaleOrderCreateForm: FC<SaleOrderCreateFormProps> = ({
  customers: initialCustomers,
  addresses: initialAddresses,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOrder.create.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
    },
  });

  const { data: customers } = api.customer.list.useQuery(
    {},
    {
      initialData: initialCustomers,
    },
  );
  const { data: addresses } = api.address.list.useQuery(
    {},
    {
      initialData: initialAddresses,
    },
  );

  const formattedCustomers =
    customers?.map((customer) => ({
      id: customer.id,
      label: `${customer.firstname} ${customer.middlename} ${customer.lastname}`,
      value: customer.id,
    })) ?? [];
  const formattedAddresses =
    addresses?.map((address) => ({
      id: address.id,
      label: address.name,
      value: address.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SaleOrderCreateFormFields>({
    resolver: zodResolver(saleOrderCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit} variant="sections">
      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormInput<SaleOrderCreateFormFields>
          id="priority"
          label="Priority"
          name="priority"
          type="text"
          errors={errors}
          register={register}
        />
      </FormSection>

      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDateInput<SaleOrderCreateFormFields>
          id="startdate"
          label="Start Date"
          name="startdate"
          control={control}
          errors={errors}
        />
        <FormDateInput<SaleOrderCreateFormFields>
          id="enddate"
          label="End Date"
          name="enddate"
          control={control}
          errors={errors}
        />
      </FormSection>

      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDropdownInput<SaleOrderCreateFormFields>
          label="Customer"
          name="customerId"
          errors={errors}
          control={control}
          options={formattedCustomers}
        />
        <FormDropdownInput<SaleOrderCreateFormFields>
          label="Address"
          name="addressId"
          errors={errors}
          control={control}
          options={formattedAddresses}
        />
        <FormInput<SaleOrderCreateFormFields>
          id="customerType"
          label="Customer Type"
          name="customerType"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<SaleOrderCreateFormFields>
          id="source"
          label="Source"
          name="source"
          type="text"
          errors={errors}
          register={register}
        />
      </FormSection>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </div>
    </Form>
  );
};
