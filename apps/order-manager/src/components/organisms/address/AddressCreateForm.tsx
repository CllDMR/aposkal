"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addressCreateInput } from "@acme/api/src/inputs/address";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type AddressCreateFormFields = RouterInputs["address"]["create"];

export const AddressCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.address.create.useMutation({
    async onSettled() {
      await context.address.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddressCreateFormFields>({
    resolver: zodResolver(addressCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<AddressCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="city"
        label="City"
        name="city"
        type="text"
        autoComplete="city"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="district"
        label="District"
        name="district"
        type="text"
        autoComplete="district"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="street"
        label="Street"
        name="street"
        type="text"
        autoComplete="street"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="country"
        label="Country"
        name="country"
        type="text"
        autoComplete="country"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="state"
        label="State"
        name="state"
        type="text"
        autoComplete="state"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCreateFormFields>
        id="longAddressDescription"
        label="LongAddressDescription"
        name="longAddressDescription"
        type="text"
        autoComplete="longAddressDescription"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
};
