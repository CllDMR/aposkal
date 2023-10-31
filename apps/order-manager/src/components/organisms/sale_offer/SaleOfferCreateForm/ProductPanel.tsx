"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, FormInput } from "@acme/ui/molecules";
import { Table } from "@acme/ui/organisms";

import type { RouterInputs } from "~/utils/api";

interface TableItem {
  id: string;

  amount: number;
  currency: string;
  kdv: number;
  productId: string;
  total: number;
  unitPrice: number;
}

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreateProductPanel: FC = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SaleOfferCreateFormFields>();

  const { fields, append, remove } = useFieldArray({
    name: "saleOfferProducts",
    control,
  });

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Döviz Cinsi",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.currency`}
            name={`saleOfferProducts.${row.row.index}.currency`}
            type="text"
            errors={errors.saleOfferProducts?.[row.row.index]}
            register={register}
          />
        ),
        accessorKey: "currency",
        footer: "Döviz Cinsi",
      },
      {
        header: "Miktar",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.amount`}
            name={`saleOfferProducts.${row.row.index}.amount`}
            type="number"
            errors={errors.saleOfferProducts?.[row.row.index]}
            register={register}
            rules={{ valueAsNumber: true }}
          />
        ),
        accessorKey: "amount",
        footer: "Miktar",
      },
      {
        header: "Birim Fiyat",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.unitPrice`}
            name={`saleOfferProducts.${row.row.index}.unitPrice`}
            type="number"
            errors={errors.saleOfferProducts?.[row.row.index]}
            register={register}
            rules={{ valueAsNumber: true }}
          />
        ),
        accessorKey: "unitPrice",
        footer: "Birim Fiyat",
      },
      {
        header: "KDV",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.kdv`}
            name={`saleOfferProducts.${row.row.index}.kdv`}
            type="number"
            errors={errors.saleOfferProducts?.[row.row.index]}
            register={register}
            rules={{ valueAsNumber: true }}
          />
        ),
        accessorKey: "kdv",
        footer: "KDV",
      },
      {
        header: "Total",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.total`}
            name={`saleOfferProducts.${row.row.index}.total`}
            type="number"
            errors={errors.saleOfferProducts?.[row.row.index]}
            register={register}
            rules={{ valueAsNumber: true }}
          />
        ),
        accessorKey: "total",
        footer: "Total",
      },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <div>
              <Button
                variant={Button.variant.ACCENT}
                type="button"
                onClick={() => {
                  remove(row.index);
                }}
              >
                Remove
              </Button>
            </div>
          );
        },
        footer: "",
      },
    ],
    [errors.saleOfferProducts, register, remove],
  );

  return (
    <div className="divide-y">
      <div className="mb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Ürün ve Hizmetler
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Ürün ve hizmetlerinizi ekleyin. Açıklama, İskonto ve vergi oranlarını
          belirlemek için sağdaki düğmeye tıklayın.
        </p>
      </div>

      <Table
        columns={cols}
        data={fields}
        showFooter={false}
        showGlobalFilter={false}
        showNavigation
      />

      <Button
        type="button"
        onClick={() =>
          append({
            amount: 0,
            currency: "",
            kdv: 0,
            productId: "",
            total: 0,
            unitPrice: 0,
          })
        }
      >
        Add Product
      </Button>
    </div>
  );
};
