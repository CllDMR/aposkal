"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@acme/api-client";
import { addressCompanyCreateInput } from "@acme/api/src/inputs/address/address_company";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";

type AddressCompanyCreateFormFields = RouterInputs["addressCompany"]["create"];

export const AddressCompanyCreateForm: FC = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.addressCompany.create.useMutation({
    async onSettled() {
      await utils.addressCompany.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddressCompanyCreateFormFields>({
    resolver: zodResolver(addressCompanyCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<AddressCompanyCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="city"
        label="City"
        name="city"
        type="text"
        autoComplete="city"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="district"
        label="District"
        name="district"
        type="text"
        autoComplete="district"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="street"
        label="Street"
        name="street"
        type="text"
        autoComplete="street"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="country"
        label="Country"
        name="country"
        type="text"
        autoComplete="country"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="state"
        label="State"
        name="state"
        type="text"
        autoComplete="state"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyCreateFormFields>
        id="longAddressDescription"
        label="LongAddressDescription"
        name="longAddressDescription"
        type="text"
        autoComplete="longAddressDescription"
        errors={errors}
        register={register}
      />

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
