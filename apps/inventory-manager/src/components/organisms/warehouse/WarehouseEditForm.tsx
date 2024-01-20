"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { warehouseUpdateInput } from "@acme/api/src/inputs/warehouse";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

type WarehouseEditFormFields = RouterInputs["warehouse"]["update"];
type Warehouse = NonNullable<RouterOutputs["warehouse"]["get"]>;

export const WarehouseEditForm: FC<{ warehouse: Warehouse }> = ({
  warehouse: initialWarehouse,
}) => {
  const utils = api.useUtils();
  const [warehouse] = api.warehouse.get.useSuspenseQuery(
    { id: initialWarehouse.id },
    { initialData: initialWarehouse },
  );

  const { mutateAsync } = api.warehouse.update.useMutation({
    async onSettled() {
      await utils.warehouse.list.invalidate();
      await utils.warehouse.get.invalidate();
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
