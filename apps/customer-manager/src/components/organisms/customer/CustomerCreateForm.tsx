"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerCreateInput } from "@acme/api/src/inputs/customer";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDateInput, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type CustomerCreateFormFields = RouterInputs["customer"]["create"];

export const CustomerCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.customer.create.useMutation({
    async onSettled() {
      await context.customer.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CustomerCreateFormFields>({
    resolver: zodResolver(customerCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<CustomerCreateFormFields>
        id="firstname"
        label="Firstname"
        name="firstname"
        type="text"
        autoComplete="firstname"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerCreateFormFields>
        id="middlename"
        label="Middlename"
        name="middlename"
        type="text"
        autoComplete="middlename"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerCreateFormFields>
        id="lastname"
        label="Lastname"
        name="lastname"
        type="text"
        autoComplete="lastname"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerCreateFormFields>
        id="gender"
        label="Gender"
        name="gender"
        type="text"
        autoComplete="gender"
        errors={errors}
        register={register}
      />
      <FormDateInput<CustomerCreateFormFields>
        id="birthdate"
        label="Birth Date"
        name="birthdate"
        control={control}
        errors={errors}
      />
      <FormInput<CustomerCreateFormFields>
        id="source"
        label="Source"
        name="source"
        type="text"
        autoComplete="source"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerCreateFormFields>
        id="profileImage"
        label="ProfileImage"
        name="profileImage"
        type="text"
        autoComplete="profileImage"
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
