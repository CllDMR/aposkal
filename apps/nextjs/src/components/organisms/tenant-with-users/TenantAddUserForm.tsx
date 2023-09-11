"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { tenantAddUserInput } from "@acme/api/src/inputs/tenant";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type TenantAddUserFormFields = RouterInputs["tenant"]["addUser"];

export const TenantAddUserForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.tenant.addUser.useMutation({
    async onSettled() {
      await context.tenant.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TenantAddUserFormFields>({
    resolver: zodResolver(tenantAddUserInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<TenantAddUserFormFields>
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Add User
      </Button>
    </Form>
  );
};
