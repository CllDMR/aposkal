"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerUpdateInput } from "@acme/api/src/inputs/customer";
import { Form } from "@acme/ui/atoms";
import { Button, FormDateInput, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type CustomerEditFormFields = RouterInputs["customer"]["update"];
type Customer = NonNullable<RouterOutputs["customer"]["get"]>;

export const CustomerEditForm: FC<{ customer: Customer }> = ({
  customer: initialCustomer,
}) => {
  const context = api.useContext();
  const [customer] = api.customer.get.useSuspenseQuery(
    { id: initialCustomer.id },
    { initialData: initialCustomer },
  );

  const { mutateAsync } = api.customer.update.useMutation({
    async onSettled() {
      await context.customer.list.invalidate();
      await context.customer.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CustomerEditFormFields>({
    resolver: zodResolver(customerUpdateInput),
    defaultValues: customerUpdateInput.parse(customer),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<CustomerEditFormFields>
        id="firstname"
        label="Firstname"
        name="firstname"
        type="text"
        autoComplete="firstname"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerEditFormFields>
        id="middlename"
        label="Middlename"
        name="middlename"
        type="text"
        autoComplete="middlename"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerEditFormFields>
        id="lastname"
        label="Lastname"
        name="lastname"
        type="text"
        autoComplete="lastname"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerEditFormFields>
        id="gender"
        label="Gender"
        name="gender"
        type="text"
        autoComplete="gender"
        errors={errors}
        register={register}
      />
      <FormDateInput<CustomerEditFormFields>
        id="birthdate"
        label="Birth Date"
        name="birthdate"
        control={control}
        errors={errors}
      />
      <FormInput<CustomerEditFormFields>
        id="source"
        label="Source"
        name="source"
        type="text"
        autoComplete="source"
        errors={errors}
        register={register}
      />
      <FormInput<CustomerEditFormFields>
        id="profileImage"
        label="ProfileImage"
        name="profileImage"
        type="text"
        autoComplete="profileImage"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Update
      </Button>
    </Form>
  );
};
