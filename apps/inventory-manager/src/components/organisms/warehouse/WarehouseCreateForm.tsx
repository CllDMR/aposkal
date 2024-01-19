"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@acme/api-client";
import { warehouseCreateInput } from "@acme/api/src/inputs/warehouse";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";

type WarehouseCreateFormFields = RouterInputs["warehouse"]["create"];

export const WarehouseCreateForm: FC = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.warehouse.create.useMutation({
    async onSettled() {
      await utils.warehouse.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<WarehouseCreateFormFields>({
    resolver: zodResolver(warehouseCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<WarehouseCreateFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
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
