"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { saleOrderCreateInput } from "@acme/api/src/inputs/sale_order";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOrderCreateFormFields = RouterInputs["saleOrder"]["create"];

export const SaleOrderCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOrder.create.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SaleOrderCreateFormFields>({
    resolver: zodResolver(saleOrderCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<SaleOrderCreateFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
};
