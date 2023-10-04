"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { warehouseUpdateInput } from "@acme/api/src/inputs/warehouse";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type WarehouseEditFormFields = RouterInputs["warehouse"]["update"];
type Warehouse = NonNullable<RouterOutputs["warehouse"]["get"]>;

export const WarehouseEditForm: FC<{ warehouse: Warehouse }> = ({
  warehouse: initialWarehouse,
}) => {
  const context = api.useContext();
  const [warehouse] = api.warehouse.get.useSuspenseQuery(
    { id: initialWarehouse.id },
    { initialData: initialWarehouse },
  );

  const { mutateAsync } = api.warehouse.update.useMutation({
    async onSettled() {
      await context.warehouse.list.invalidate();
      await context.warehouse.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<WarehouseEditFormFields>({
    resolver: zodResolver(warehouseUpdateInput),
    defaultValues: warehouseUpdateInput.parse(warehouse),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<WarehouseEditFormFields>
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
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
