"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOrderUpdateInput } from "@acme/api/src/inputs/sale_order";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOrderEditFormFields = RouterInputs["saleOrder"]["update"];

interface SaleOrderEditFormProps {
  saleOrder: NonNullable<RouterOutputs["saleOrder"]["get"]>;
}

export const SaleOrderEditForm: FC<SaleOrderEditFormProps> = ({
  saleOrder: initialSaleOrder,
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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
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
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Update
      </Button>
    </Form>
  );
};
