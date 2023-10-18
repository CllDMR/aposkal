"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { tenantCreateInput } from "@acme/api/src/inputs/tenant";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import { api } from "~/utils/api";

interface CreateTenantFromFields {
  name: string;
}

export const CreateTenant: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTenantFromFields>({
    resolver: zodResolver(tenantCreateInput),
  });

  const context = api.useContext();
  const { mutateAsync } = api.tenant.create.useMutation({
    async onSettled() {
      await context.tenant.listOfUserTenants.invalidate();
      reset();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form className="" onSubmit={onSubmit}>
      <FormInput<CreateTenantFromFields>
        id="name"
        label="Name"
        name="name"
        type="name"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Add Tenant
      </Button>
    </Form>
  );
};
