"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";
import { Table } from "@acme/ui/organisms";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;

  productId: string;
  currency: string;
  unitPrice: number;
  kdv: number;
  amount: number;
  total: number;
}

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreateProductPanelProps {
  products: RouterOutputs["product"]["list"];
}

export const SaleOfferCreateProductPanel: FC<
  SaleOfferCreateProductPanelProps
> = ({ products: initialProducts }) => {
  const { data: products } = api.product.list.useQuery(
    {},
    { initialData: initialProducts },
  );

  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = useFormContext<SaleOfferCreateFormFields>();

  const { fields, append, remove, update } = useFieldArray({
    name: "saleOfferProducts",
    control,
  });

  const cols = useMemo<ColumnDef<TableItem>[]>(() => {
    fields; // using at dependency array of useMemo

    const formattedProducts =
      products?.map((product) => ({
        id: product.id,
        label: product.name,
        value: product.id,
      })) ?? [];

    return [
      {
        header: "Ürün",
        cell: (row) => (
          <FormDropdownInput<SaleOfferCreateFormFields>
            name={`saleOfferProducts.${row.row.index}.productId`}
            errors={errors}
            control={control}
            options={formattedProducts}
            onChange={(val) => {
              const currentValues = getValues();
              const product = products.find((e) => e.id === val.id);

              update(row.row.index, {
                productId:
                  currentValues.saleOfferProducts[row.row.index]?.productId ??
                  "",
                name:
                  product?.name ??
                  currentValues.saleOfferProducts[row.row.index]?.name ??
                  "",
                currency:
                  product?.currency ??
                  currentValues.saleOfferProducts[row.row.index]?.currency ??
                  "",
                unit:
                  product?.unit ??
                  currentValues.saleOfferProducts[row.row.index]?.unit ??
                  "",
                unitPrice:
                  product?.unitPrice ??
                  currentValues.saleOfferProducts[row.row.index]?.unitPrice ??
                  0,
                kdv:
                  product?.kdv ??
                  currentValues.saleOfferProducts[row.row.index]?.kdv ??
                  0,
                amount:
                  currentValues.saleOfferProducts[row.row.index]?.amount ?? 0,
                total:
                  currentValues.saleOfferProducts[row.row.index]?.total ?? 0,
              });
            }}
          />
        ),
        accessorKey: "productId",
        footer: "Ürün",
      },
      {
        header: "Döviz Cinsi",
        cell: (row) => (
          <FormInput<SaleOfferCreateFormFields>
            id={`saleOfferProducts.${row.row.index}.currency`}
            name={`saleOfferProducts.${row.row.index}.currency`}
            type="text"
            errors={errors}
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
            errors={errors}
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
            errors={errors}
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
            errors={errors}
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
            errors={errors}
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
    ];
  }, [control, errors, getValues, products, register, remove, update, fields]);

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
            productId: "",
            name: "",
            currency: "",
            unit: "",
            unitPrice: 0,
            kdv: 0,
            amount: 0,
            total: 0,
          })
        }
      >
        Add Product
      </Button>
    </div>
  );
};
